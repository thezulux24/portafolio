"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HUES } from "@/lib/scene";

const HOLO = new THREE.Color(...HUES.holo);
const SODIUM = new THREE.Color(...HUES.sodium);

// Where the work happens: based in Cali, working remotely for Naples, Florida.
const CALI = { lat: 3.45, lon: -76.53 };
const NAPLES = { lat: 26.14, lon: -81.79 };
// The globe faces the Americas.
const CENTER = { lat: 14, lon: -79 };

const toRad = (deg: number) => (deg * Math.PI) / 180;

function onSphere(lat: number, lon: number, radius = 1) {
    const la = toRad(lat);
    const lo = toRad(lon);
    return new THREE.Vector3(Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)).multiplyScalar(radius);
}

const DOT_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uFormed;
uniform float uSize;
varying float vFacing;
varying float vScan;
varying float vSeed;

void main() {
    // Unformed, every dot hangs further out on its own ray and falls into place.
    float p = clamp(uFormed * 1.6 - aSeed * 0.6, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);
    vec3 pos = position * mix(1.55 + aSeed * 0.5, 1.0, p);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec3 n = normalize(normalMatrix * position);
    vFacing = n.z;
    vSeed = aSeed;

    // A scan band climbs the globe in world space.
    vec4 world = modelMatrix * vec4(position, 1.0);
    vScan = smoothstep(0.09, 0.0, abs(world.y - (fract(uTime * 0.09) * 2.6 - 1.3)));

    gl_PointSize = uSize * (0.55 + 0.45 * max(vFacing, 0.0)) * smoothstep(0.0, 0.25, p);
    gl_Position = projectionMatrix * mv;
}`;

const DOT_FRAG = /* glsl */ `
uniform vec3 uHolo;
uniform float uTime;
varying float vFacing;
varying float vScan;
varying float vSeed;

void main() {
    float r = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.18, r);
    // The far side reads faintly through the glass; the near side is lit.
    float side = mix(0.12, 1.0, smoothstep(-0.25, 0.35, vFacing));
    float twinkle = 0.82 + 0.18 * sin(uTime * 1.7 + vSeed * 80.0);
    vec3 col = uHolo * (0.55 + 0.6 * vScan) + vScan * 0.35;
    gl_FragColor = vec4(col, disc * side * twinkle);
}`;

const RIM_VERT = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
}`;

// The globe's edge disperses like foil at a grazing angle.
const RIM_FRAG = /* glsl */ `
uniform vec3 uHolo;
uniform float uFormed;
varying vec3 vNormal;
varying vec3 vView;
void main() {
    float ndv = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
    float rim = pow(1.0 - ndv, 3.2);
    vec3 spectrum = 0.6 + 0.4 * cos(6.28318 * (ndv * 1.4 + vec3(0.0, 0.33, 0.67)));
    vec3 col = mix(uHolo, spectrum, 0.45) * rim;
    gl_FragColor = vec4(col, rim * 0.85 * uFormed);
}`;

const ARC_FRAG = /* glsl */ `
uniform vec3 uHolo;
uniform vec3 uSodium;
uniform float uTime;
uniform float uFormed;
varying vec2 vUv;
void main() {
    float head = fract(uTime * 0.32);
    float d = vUv.x - head;
    float pulse = exp(-d * d * 260.0);
    float drawn = step(vUv.x, uFormed * 1.2 - 0.2);
    vec3 col = mix(uHolo * 0.7, uSodium * 1.4, pulse);
    gl_FragColor = vec4(col, (0.5 + 0.5 * pulse) * drawn);
}`;

const ARC_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

function useLand() {
    const [positions, setPositions] = useState<{ position: Float32Array; seed: Float32Array } | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch("/holo/land.bin")
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
                if (cancelled) return;
                const raw = new Int16Array(buffer);
                const count = raw.length / 2;
                const position = new Float32Array(count * 3);
                const seed = new Float32Array(count);
                for (let i = 0; i < count; i++) {
                    const point = onSphere(raw[i * 2] / 100, raw[i * 2 + 1] / 100);
                    position.set([point.x, point.y, point.z], i * 3);
                    seed[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1;
                    if (seed[i] < 0) seed[i] += 1;
                }
                setPositions({ position, seed });
            })
            .catch(() => {
                // Without the land data the globe keeps its rim and route; the page still reads.
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return positions;
}

function Marker({ lat, lon, delay }: { lat: number; lon: number; delay: number }) {
    const ring = useRef<THREE.Mesh>(null);
    const placement = useMemo(() => {
        const at = onSphere(lat, lon, 1.004);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), at.clone().normalize());
        return { at, quaternion };
    }, [lat, lon]);

    useFrame((state) => {
        if (!ring.current) return;
        const t = (state.clock.elapsedTime * 0.6 + delay) % 1;
        ring.current.scale.setScalar(1 + t * 2.4);
        (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.9;
    });

    return (
        <group position={placement.at} quaternion={placement.quaternion}>
            <mesh>
                <circleGeometry args={[0.014, 24]} />
                <meshBasicMaterial color={SODIUM} transparent depthWrite={false} />
            </mesh>
            <mesh ref={ring}>
                <ringGeometry args={[0.018, 0.024, 40]} />
                <meshBasicMaterial color={SODIUM} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function Globe({ visible }: { visible: boolean }) {
    const land = useLand();
    const lean = useRef<THREE.Group>(null);
    const dots = useRef<THREE.ShaderMaterial>(null);
    const rim = useRef<THREE.ShaderMaterial>(null);
    const arc = useRef<THREE.ShaderMaterial>(null);
    const pointer = useRef({ x: 0, y: 0 });
    const still = useRef(false);
    const formed = useRef(0);
    const { viewport, size } = useThree();

    useEffect(() => {
        still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (still.current) formed.current = 1;
        const onMove = (event: PointerEvent) => {
            if (event.pointerType === "touch" || still.current) return;
            pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    const route = useMemo(() => {
        const from = onSphere(CALI.lat, CALI.lon);
        const to = onSphere(NAPLES.lat, NAPLES.lon);
        const points = Array.from({ length: 48 }, (_, index) => {
            const t = index / 47;
            const lift = 1 + Math.sin(Math.PI * t) * 0.1;
            return from.clone().lerp(to, t).normalize().multiplyScalar(lift);
        });
        return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, 0.0045, 6, false);
    }, []);

    const dotUniforms = useMemo(
        () => ({ uTime: { value: 0 }, uFormed: { value: 0 }, uSize: { value: 4 }, uHolo: { value: HOLO } }),
        []
    );
    const rimUniforms = useMemo(() => ({ uHolo: { value: HOLO }, uFormed: { value: 0 } }), []);
    const arcUniforms = useMemo(
        () => ({ uHolo: { value: HOLO }, uSodium: { value: SODIUM }, uTime: { value: 0 }, uFormed: { value: 0 } }),
        []
    );

    const radius = Math.min(viewport.width, viewport.height) * 0.42;

    useFrame((state, delta) => {
        const t = still.current ? 4 : state.clock.elapsedTime;
        // The globe resolves the first time it comes into view, then stays formed.
        if (visible && land && formed.current < 1) formed.current = Math.min(1, formed.current + delta / 1.8);
        const f = formed.current;
        const sizePx = Math.max(2.2, (size.height * radius) / viewport.height / 95) * state.viewport.dpr;

        const d = dots.current?.uniforms;
        if (d) {
            d.uTime.value = t;
            d.uFormed.value = f;
            d.uSize.value = sizePx;
        }
        if (rim.current) rim.current.uniforms.uFormed.value = f;
        const a = arc.current?.uniforms;
        if (a) {
            a.uTime.value = t;
            a.uFormed.value = THREE.MathUtils.clamp((f - 0.55) / 0.45, 0, 1);
        }

        if (lean.current) {
            const ease = 1 - Math.exp(-delta * 3);
            const swing = still.current ? 0 : Math.sin(t * 0.22) * 0.3;
            lean.current.rotation.y += (pointer.current.x * 0.35 + swing - lean.current.rotation.y) * ease;
            lean.current.rotation.x += (pointer.current.y * 0.2 - lean.current.rotation.x) * ease;
        }
    });

    return (
        <group ref={lean} scale={radius}>
            <group rotation={[toRad(CENTER.lat), -toRad(CENTER.lon), 0]}>
                {/* Dark glass so the far side only shows faintly through. */}
                <mesh renderOrder={0}>
                    <sphereGeometry args={[0.992, 64, 48]} />
                    <meshBasicMaterial color="#050a16" transparent opacity={0.72} depthWrite={false} />
                </mesh>
                {land && (
                    <points renderOrder={1}>
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[land.position, 3]} />
                            <bufferAttribute attach="attributes-aSeed" args={[land.seed, 1]} />
                        </bufferGeometry>
                        <shaderMaterial
                            ref={dots}
                            vertexShader={DOT_VERT}
                            fragmentShader={DOT_FRAG}
                            uniforms={dotUniforms}
                            transparent
                            depthWrite={false}
                            blending={THREE.AdditiveBlending}
                        />
                    </points>
                )}
                <mesh geometry={route} renderOrder={2}>
                    <shaderMaterial
                        ref={arc}
                        vertexShader={ARC_VERT}
                        fragmentShader={ARC_FRAG}
                        uniforms={arcUniforms}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
                <Marker lat={CALI.lat} lon={CALI.lon} delay={0} />
                <Marker lat={NAPLES.lat} lon={NAPLES.lon} delay={0.5} />
            </group>
            <mesh renderOrder={3}>
                <sphereGeometry args={[1.035, 64, 48]} />
                <shaderMaterial
                    ref={rim}
                    vertexShader={RIM_VERT}
                    fragmentShader={RIM_FRAG}
                    uniforms={rimUniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

/** A holographic globe: land as light, and the route the work travels, Cali to Naples. */
export default function HoloGlobe({ className }: { className?: string }) {
    const wrapper = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = wrapper.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapper} className={className} aria-hidden="true">
            <Canvas
                dpr={[1, 1.75]}
                frameloop={visible ? "always" : "never"}
                camera={{ fov: 30, position: [0, 0, 5] }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                style={{ pointerEvents: "none" }}
            >
                <Globe visible={visible} />
            </Canvas>
        </div>
    );
}
