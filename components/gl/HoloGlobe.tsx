"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HUES } from "@/lib/scene";

const HOLO = new THREE.Color(...HUES.holo);
const SODIUM = new THREE.Color(...HUES.sodium);
const NEON = new THREE.Color(1.0, 0.3, 0.62);

// Home base: Cali. The main route goes to Naples, Florida (remote work today); the rest is the
// network a remote engineer reaches from there.
const CALI = { lat: 3.45, lon: -76.53 };
const ROUTES = [
    { lat: 26.14, lon: -81.79, main: true }, // Naples, FL
    { lat: 40.71, lon: -74.0 }, // New York
    { lat: 37.77, lon: -122.42 }, // San Francisco
    { lat: 19.43, lon: -99.13 }, // Mexico City
    { lat: 4.71, lon: -74.07 }, // Bogotá
    { lat: -23.55, lon: -46.63 }, // São Paulo
    { lat: -34.6, lon: -58.38 }, // Buenos Aires
    { lat: 40.42, lon: -3.7 }, // Madrid
    { lat: 51.51, lon: -0.13 }, // London
];
// The globe faces the Americas, turned a little toward the Atlantic so Europe shows on the swing.
const CENTER = { lat: 16, lon: -66 };

// Time and build progress shared by every arc: one uniform object, many materials.
const ARC_CLOCK = { uTime: { value: 0 }, uFormed: { value: 0 } };

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
uniform vec3 uPulse;
uniform float uTime;
uniform float uFormed;
uniform float uPhase;
uniform float uBase;
varying vec2 vUv;
void main() {
    float head = fract(uTime * 0.28 + uPhase);
    float d = vUv.x - head;
    float pulse = exp(-d * d * 320.0);
    float drawn = step(vUv.x, uFormed * 1.25 - 0.25 - uPhase * 0.2);
    vec3 col = mix(uHolo * 0.7, uPulse * 1.5, pulse);
    gl_FragColor = vec4(col, (uBase + (1.0 - uBase) * pulse) * drawn);
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

function Marker({ lat, lon, delay, color = SODIUM, size = 1 }: { lat: number; lon: number; delay: number; color?: THREE.Color; size?: number }) {
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
            <mesh scale={size}>
                <circleGeometry args={[0.014, 24]} />
                <meshBasicMaterial color={color} transparent depthWrite={false} />
            </mesh>
            <mesh ref={ring} scale={size}>
                <ringGeometry args={[0.018, 0.024, 40]} />
                <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function Globe({ visible }: { visible: boolean }) {
    const land = useLand();
    const lean = useRef<THREE.Group>(null);
    const dots = useRef<THREE.ShaderMaterial>(null);
    const rim = useRef<THREE.ShaderMaterial>(null);
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

    const routes = useMemo(() => {
        const from = onSphere(CALI.lat, CALI.lon);
        return ROUTES.map((route, index) => {
            const to = onSphere(route.lat, route.lon);
            const span = from.angleTo(to);
            const points = Array.from({ length: 64 }, (_, step) => {
                const t = step / 63;
                // Longer routes fly higher, so they read as arcs and not as scratches on the surface.
                const lift = 1 + Math.sin(Math.PI * t) * (0.05 + span * 0.22);
                return from.clone().lerp(to, t).normalize().multiplyScalar(lift);
            });
            const main = "main" in route && route.main;
            return {
                key: `${route.lat},${route.lon}`,
                route,
                main,
                geometry: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, main ? 0.0048 : 0.0028, 6, false),
                uniforms: {
                    uTime: ARC_CLOCK.uTime,
                    uFormed: ARC_CLOCK.uFormed,
                    uHolo: { value: HOLO },
                    uPulse: { value: main ? SODIUM : index % 2 ? NEON : HOLO },
                    uPhase: { value: main ? 0 : (index * 0.137) % 1 },
                    uBase: { value: main ? 0.5 : 0.22 },
                },
            };
        });
    }, []);

    const dotUniforms = useMemo(
        () => ({ uTime: { value: 0 }, uFormed: { value: 0 }, uSize: { value: 4 }, uHolo: { value: HOLO } }),
        []
    );
    const rimUniforms = useMemo(() => ({ uHolo: { value: HOLO }, uFormed: { value: 0 } }), []);

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
        ARC_CLOCK.uTime.value = t;
        ARC_CLOCK.uFormed.value = THREE.MathUtils.clamp((f - 0.5) / 0.5, 0, 1);

        if (lean.current) {
            const ease = 1 - Math.exp(-delta * 3);
            const swing = still.current ? 0 : Math.sin(t * 0.18) * 0.5;
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
                {routes.map((route) => (
                    <mesh key={route.key} geometry={route.geometry} renderOrder={2}>
                        <shaderMaterial
                            vertexShader={ARC_VERT}
                            fragmentShader={ARC_FRAG}
                            uniforms={route.uniforms}
                            transparent
                            depthWrite={false}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                ))}
                <Marker lat={CALI.lat} lon={CALI.lon} delay={0} size={1.25} />
                {routes.map((route, index) => (
                    <Marker
                        key={route.key}
                        lat={route.route.lat}
                        lon={route.route.lon}
                        delay={(index * 0.29) % 1}
                        color={route.main ? SODIUM : HOLO}
                        size={route.main ? 1 : 0.7}
                    />
                ))}
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

/** A holographic globe: land as light, and routes of light from Cali to the places the work reaches. */
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
                dpr={[1, 1.5]}
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
