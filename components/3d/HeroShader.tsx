"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView } from "framer-motion";
import * as THREE from "three";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

const vertexShader = /* glsl */ `
void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision mediump float;

uniform float uTime;
uniform float uBoost;
uniform vec2 uRes;
uniform vec2 uMouse;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p = rot * p * 2.02;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    vec2 mouse = vec2(uMouse.x * uRes.x / uRes.y, uMouse.y) * 0.5;

    float t = uTime * 0.065;

    vec2 p = uv * 1.45;
    float q = fbm(p + vec2(t, -t * 0.6));
    float r = fbm(p + q * 1.65 + vec2(-t * 0.75, t * 0.42) + mouse * 0.65);
    float f = fbm(p + r * 1.75);

    vec3 ink = vec3(0.039, 0.039, 0.035);
    vec3 smoke = vec3(0.105, 0.112, 0.088);
    vec3 acid = vec3(0.784, 0.953, 0.114);

    vec3 color = mix(ink, smoke, smoothstep(0.26, 0.88, f));
    color += acid * pow(smoothstep(0.50, 0.95, r), 3.0) * 0.32 * uBoost;
    color += acid * pow(smoothstep(0.60, 1.0, f), 4.5) * 0.20 * uBoost;

    float d = length(uv - mouse);
    color += acid * exp(-d * 2.5) * 0.075 * uBoost;

    vec2 grid = abs(fract(uv * 8.0 - 0.5) - 0.5) / fwidth(uv * 8.0);
    float line = min(grid.x, grid.y);
    float gridMask = (1.0 - min(line, 1.0)) * exp(-d * 1.8) * 0.08;
    color += acid * gridMask;

    color *= 1.0 - dot(uv * 0.82, uv * 0.82);

    gl_FragColor = vec4(color, 1.0);
}
`;

function Artifact3D({ autoMode }: { autoMode: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const innerRef = useRef<THREE.Mesh>(null);
    const shellRef = useRef<THREE.Mesh>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();
    const pointer = useRef(new THREE.Vector2(0, 0));
    const touchActive = useRef(false);

    useEffect(() => {
        const onMove = (event: MouseEvent) => {
            pointer.current.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                (event.clientY / window.innerHeight) * 2 - 1
            );
        };
        const onTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];
            if (!touch) return;
            touchActive.current = true;
            pointer.current.set(
                (touch.clientX / window.innerWidth) * 2 - 1,
                (touch.clientY / window.innerHeight) * 2 - 1
            );
        };
        const onTouchEnd = () => {
            touchActive.current = false;
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    useFrame((state, delta) => {
        const group = groupRef.current;
        if (!group) return;
        const t = state.clock.elapsedTime;

        group.rotation.y += delta * 0.25;
        const useAuto = autoMode && !touchActive.current;
        const targetX = useAuto
            ? Math.sin(t * 0.35) * 0.28
            : pointer.current.y * 0.42;
        const targetZ = useAuto
            ? Math.cos(t * 0.25) * 0.18
            : pointer.current.x * 0.32;
        group.rotation.x += (targetX - group.rotation.x) * 0.065;
        group.rotation.z += (targetZ - group.rotation.z) * 0.065;

        if (innerRef.current) {
            innerRef.current.rotation.x -= delta * 0.18;
        }
        if (shellRef.current) {
            shellRef.current.rotation.y -= delta * 0.32;
            shellRef.current.rotation.z += delta * 0.12;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z += delta * 0.45;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x -= delta * 0.35;
        }

        group.position.x = autoMode ? 0 : viewport.width * 0.21;
        group.position.y = (autoMode ? 0.32 : 0.12) + Math.sin(t * 0.6) * 0.12;

        const KNOT_DIAMETER = 2.6;
        const scale = autoMode
            ? Math.min(1.12, (0.62 * viewport.width) / KNOT_DIAMETER)
            : Math.min(1.05, viewport.width / 9.6);
        group.scale.setScalar(scale);
    });

    return (
        <group ref={groupRef}>
            <mesh ref={innerRef}>
                <torusKnotGeometry args={[1.02, 0.28, 150, 22]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.44} />
            </mesh>
            <mesh ref={shellRef} scale={1.58} rotation={[0.4, 0.2, 0]}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial wireframe color="#ece9e1" transparent opacity={0.075} />
            </mesh>
            <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, 0.2, 0]}>
                <torusGeometry args={[1.95, 0.008, 8, 96]} />
                <meshBasicMaterial color="#c8f31d" transparent opacity={0.28} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[0.35, Math.PI / 3, 0]}>
                <torusGeometry args={[2.18, 0.006, 8, 96]} />
                <meshBasicMaterial color="#ece9e1" transparent opacity={0.14} />
            </mesh>
        </group>
    );
}

function ShaderPlane({ autoMode }: { autoMode: boolean }) {
    const { size, viewport } = useThree();
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const mouse = useRef(new THREE.Vector2(0, 0));
    const target = useRef(new THREE.Vector2(0, 0));

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uBoost: { value: 1 },
            uRes: { value: new THREE.Vector2(1, 1) },
            uMouse: { value: new THREE.Vector2(0, 0) },
        }),
        []
    );

    useEffect(() => {
        const onMove = (event: MouseEvent) => {
            target.current.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -((event.clientY / window.innerHeight) * 2 - 1)
            );
        };
        const onTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];
            if (!touch) return;
            target.current.set(
                (touch.clientX / window.innerWidth) * 2 - 1,
                -((touch.clientY / window.innerHeight) * 2 - 1)
            );
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    useFrame((state) => {
        const material = materialRef.current;
        if (!material) return;
        const t = state.clock.elapsedTime;
        material.uniforms.uTime.value = t;
        material.uniforms.uRes.value.set(
            size.width * viewport.dpr,
            size.height * viewport.dpr
        );
        material.uniforms.uBoost.value = autoMode ? 1.85 : 1.05;
        if (autoMode) {
            target.current.set(
                Math.sin(t * 0.3) * 0.7,
                Math.sin(t * 0.22 + 1.3) * 0.5
            );
        }
        mouse.current.lerp(target.current, 0.055);
        material.uniforms.uMouse.value.copy(mouse.current);
    });

    return (
        <mesh frustumCulled={false} renderOrder={-1}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

function subscribeReducedMotion(callback: () => void) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
}

export function HeroShader() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapperRef, { margin: "100px" });
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        () => false
    );
    const coarsePointer = useCoarsePointer();

    if (reducedMotion) {
        return (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(200,243,29,0.08),transparent_55%),radial-gradient(ellipse_at_75%_80%,rgba(200,243,29,0.05),transparent_50%)]" />
        );
    }

    return (
        <div ref={wrapperRef} className="absolute inset-0">
            <Canvas
                dpr={[1, 1.25]}
                frameloop={inView ? "always" : "never"}
                gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
                style={{ position: "absolute", inset: 0 }}
            >
                <ShaderPlane autoMode={coarsePointer} />
                <Artifact3D autoMode={coarsePointer} />
            </Canvas>
        </div>
    );
}
