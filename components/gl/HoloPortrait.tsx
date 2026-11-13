"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HUES, portrait } from "@/lib/scene";

const ASPECT = 1200 / 1120;
const HEIGHT = 2.4;
const WIDTH = HEIGHT * ASPECT;
const DEPTH = 0.34;

const PLANE_VERT = /* glsl */ `
uniform sampler2D uDepth;
uniform float uDepthScale;
varying vec2 vUv;
varying float vDepth;

void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vDepth = d;
    vec3 p = position;
    p.z += d * uDepthScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const PLANE_FRAG = /* glsl */ `
uniform sampler2D uMap;
uniform float uTime;
uniform float uReveal;
uniform float uOpacity;
uniform float uLines;
uniform vec3 uHolo;
varying vec2 vUv;
varying float vDepth;

float hash(float n) { return fract(sin(n) * 43758.5453); }
float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

void main() {
    vec2 uv = vUv;

    // Signal dropouts: now and then one band of the image slips sideways.
    float tick = floor(uTime * 6.0);
    float slip = step(0.9, hash(tick * 1.7));
    float bandY = hash(tick * 3.1);
    float inBand = slip * step(abs(uv.y - bandY), 0.02 + 0.05 * hash(tick * 5.3));
    uv.x += inBand * (hash(tick * 9.7) - 0.5) * 0.07;

    float split = 0.0022 + inBand * 0.012;
    vec4 c = texture2D(uMap, uv);
    float lr = luma(texture2D(uMap, uv + vec2(split, 0.0)).rgb);
    float lg = luma(c.rgb);
    float lb = luma(texture2D(uMap, uv - vec2(split, 0.0)).rgb);

    // Lift the shadows so dark cloth still reads as volume inside the beam.
    float tone = smoothstep(0.0, 0.92, pow(lg, 0.8));
    vec3 col = uHolo * (0.08 + 1.0 * tone);
    col.r += (lr - lg) * 1.8;
    col.b += (lb - lg) * 1.8;
    col = mix(col, c.rgb * 1.15, 0.3);
    col += pow(lg, 2.6) * 0.45;

    // Raster lines climbing the figure.
    float line = 0.5 + 0.5 * sin((vUv.y * uLines - uTime * 1.4) * 6.28318);
    col *= mix(0.68, 1.0, smoothstep(0.15, 0.85, line));

    // A slow refresh sweep.
    float sweepY = 1.15 - fract(uTime * 0.11) * 1.4;
    col += uHolo * smoothstep(0.07, 0.0, abs(vUv.y - sweepY)) * 0.45;

    // Light gathers on the silhouette and disperses there, the way foil does at a grazing angle.
    float rim = 1.0 - smoothstep(0.0, 0.42, vDepth);
    vec3 dispersed = 0.5 + 0.5 * cos(6.28318 * (vUv.y * 0.55 + vUv.x * 0.25 + uTime * 0.04 + vec3(0.0, 0.33, 0.67)));
    col += mix(uHolo, dispersed, 0.55) * rim * 0.7;

    col *= 0.95 + 0.05 * sin(uTime * 37.0) * step(0.55, hash(floor(uTime * 3.0)));

    // Bottom-up reconstruction with a bright leading edge.
    float visible = 1.0 - smoothstep(uReveal - 0.04, uReveal, vUv.y);
    col += uHolo * smoothstep(0.035, 0.0, abs(vUv.y - uReveal)) * 2.2 * step(uReveal, 1.02);

    float alpha = c.a * visible * smoothstep(0.0, 0.2, vUv.y) * 0.94 * uOpacity;
    gl_FragColor = vec4(col, alpha);
}`;

const POINT_VERT = /* glsl */ `
attribute vec3 aRand;
uniform sampler2D uMap;
uniform sampler2D uDepth;
uniform float uDepthScale;
uniform float uFormed;
uniform float uTime;
uniform float uSize;
varying float vLuma;
varying float vAlpha;

void main() {
    vec4 c = texture2D(uMap, uv);
    float d = texture2D(uDepth, uv).r;
    vLuma = dot(c.rgb, vec3(0.299, 0.587, 0.114));

    vec3 target = position;
    target.z += d * uDepthScale + 0.03;

    // Unformed, the points hang in a loose column above and around the plate.
    vec3 from = target + vec3((aRand.x - 0.5) * 2.4, aRand.y * 2.2 - 0.3, (aRand.z - 0.5) * 2.2);
    float p = clamp(uFormed * 1.7 - aRand.y * 0.7, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);
    vec3 pos = mix(from, target, p);
    pos.x += sin(uTime * 1.1 + aRand.x * 40.0) * 0.05 * (1.0 - p);
    pos.y += cos(uTime * 0.9 + aRand.z * 40.0) * 0.05 * (1.0 - p);

    float solid = step(0.5, c.a);
    float twinkle = 0.65 + 0.35 * sin(uTime * 2.0 + aRand.x * 60.0);
    vAlpha = solid * smoothstep(0.0, 0.2, uFormed) * mix(1.0, twinkle, p);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (0.55 + aRand.z) / -mv.z * solid;
    gl_Position = projectionMatrix * mv;
}`;

const POINT_FRAG = /* glsl */ `
uniform vec3 uHolo;
uniform float uPointAlpha;
varying float vLuma;
varying float vAlpha;

void main() {
    float r = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.15, r);
    vec3 col = uHolo * (0.3 + 1.1 * vLuma);
    gl_FragColor = vec4(col, disc * vAlpha * uPointAlpha);
}`;

const HOLO = new THREE.Color(...HUES.holo);
const STILL_TIME = 2.4;

/** Loads both textures without suspending, so the canvas root is never torn down mid-mount. */
function usePortraitTextures() {
    const [textures, setTextures] = useState<[THREE.Texture, THREE.Texture] | null>(null);

    useEffect(() => {
        let cancelled = false;
        const loader = new THREE.TextureLoader();
        Promise.all([loader.loadAsync("/holo/portrait.webp"), loader.loadAsync("/holo/portrait-depth.webp")])
            .then(([map, depth]) => {
                if (cancelled) return;
                map.anisotropy = 8;
                setTextures([map, depth]);
            })
            .catch(() => {
                // Without the textures the hero simply has no figure; the page still reads.
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return textures;
}

function Figure({ map, depth }: { map: THREE.Texture; depth: THREE.Texture }) {
    const group = useRef<THREE.Group>(null);
    const rings = useRef<THREE.Group>(null);
    const planeMaterial = useRef<THREE.ShaderMaterial>(null);
    const pointMaterial = useRef<THREE.ShaderMaterial>(null);
    const { viewport, size } = useThree();
    const pointer = useRef({ x: 0, y: 0 });
    const still = useRef(false);

    useEffect(() => {
        // Reduced motion: the figure stays, but nothing about it moves.
        still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const onMove = (event: PointerEvent) => {
            if (event.pointerType === "touch" || still.current) return;
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    const planeUniforms = useMemo(
        () => ({
            uMap: { value: map },
            uDepth: { value: depth },
            uDepthScale: { value: DEPTH },
            uTime: { value: 0 },
            uReveal: { value: 0 },
            uOpacity: { value: 1 },
            uLines: { value: 180 },
            uHolo: { value: HOLO },
        }),
        [map, depth]
    );

    const pointUniforms = useMemo(
        () => ({
            uMap: { value: map },
            uDepth: { value: depth },
            uDepthScale: { value: DEPTH },
            uFormed: { value: 0 },
            uTime: { value: 0 },
            uSize: { value: 12 },
            uHolo: { value: HOLO },
            uPointAlpha: { value: 1 },
        }),
        [map, depth]
    );

    const pointGeometry = useMemo(() => {
        const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 132, 123);
        const count = geometry.attributes.position.count;
        const rand = new Float32Array(count * 3);
        // Deterministic scatter so the assembly looks the same every visit.
        let seed = 1337;
        for (let i = 0; i < rand.length; i++) {
            seed = (seed * 16807) % 2147483647;
            rand[i] = seed / 2147483647;
        }
        geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));
        return geometry;
    }, []);

    const scale = Math.min(viewport.height / 3.2, viewport.width / 2.8);

    useFrame((state, delta) => {
        const t = still.current ? STILL_TIME : state.clock.elapsedTime;
        const formed = portrait.formed * (1 - portrait.dissolve);
        const figurePx = size.height * (HEIGHT * scale) / viewport.height;

        const plane = planeMaterial.current?.uniforms;
        if (plane) {
            plane.uTime.value = t;
            plane.uReveal.value = portrait.reveal;
            plane.uOpacity.value = Math.max(0, 1 - portrait.dissolve * 2.2);
            plane.uLines.value = figurePx / 3.4;
        }

        const points = pointMaterial.current?.uniforms;
        if (points) {
            points.uTime.value = t;
            points.uFormed.value = formed;
            points.uSize.value = Math.max(6, figurePx / 74) * state.viewport.dpr;
            // Points carry the build and the break-up; at rest they are a faint grain over the image.
            const settled = THREE.MathUtils.smoothstep(portrait.reveal, 0.5, 1.05) * (1 - portrait.dissolve);
            points.uPointAlpha.value = THREE.MathUtils.lerp(0.95, 0.12, settled);
        }

        if (group.current) {
            const ease = 1 - Math.exp(-delta * 4);
            group.current.rotation.y += (pointer.current.x * 0.26 - group.current.rotation.y) * ease;
            group.current.rotation.x += (pointer.current.y * 0.1 - group.current.rotation.x) * ease;
        }
        if (rings.current) {
            rings.current.children.forEach((ring, index) => {
                ring.rotation.z = t * (0.12 + index * 0.07) * (index % 2 ? -1 : 1);
            });
        }
    });

    return (
        <group scale={scale} position={[0, 0.26 * scale, 0]}>
            <group ref={group}>
                <mesh>
                    <planeGeometry args={[WIDTH, HEIGHT, 150, 140]} />
                    <shaderMaterial
                        ref={planeMaterial}
                        vertexShader={PLANE_VERT}
                        fragmentShader={PLANE_FRAG}
                        uniforms={planeUniforms}
                        transparent
                        depthWrite={false}
                    />
                </mesh>
                <points geometry={pointGeometry}>
                    <shaderMaterial
                        ref={pointMaterial}
                        vertexShader={POINT_VERT}
                        fragmentShader={POINT_FRAG}
                        uniforms={pointUniforms}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            </group>

            {/* Projector plate */}
            <group ref={rings} position={[0, -HEIGHT / 2 - 0.02, 0.1]} rotation={[-Math.PI / 2 + 0.09, 0, 0]}>
                {[0.48, 0.71, 0.95].map((radius, index) => (
                    <mesh key={radius}>
                        <ringGeometry args={[radius, radius + 0.007, 128, 1, 0, Math.PI * (index === 1 ? 1.55 : 2)]} />
                        <meshBasicMaterial
                            color={HOLO}
                            transparent
                            opacity={0.75 - index * 0.2}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

/** The portrait, reconstructed as a depth-displaced hologram. */
export default function HoloPortrait({ className }: { className?: string }) {
    const wrapper = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);
    const textures = usePortraitTextures();

    useEffect(() => {
        const node = wrapper.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapper} className={className} aria-hidden="true">
            <Canvas
                dpr={[1, 1.75]}
                frameloop={visible ? "always" : "never"}
                camera={{ fov: 26, position: [0, 0, 6.4], near: 0.1, far: 30 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                style={{ pointerEvents: "none" }}
            >
                {textures && <Figure map={textures[0]} depth={textures[1]} />}
            </Canvas>
        </div>
    );
}
