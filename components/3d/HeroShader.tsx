"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCoarsePointer } from "@/lib/useCoarsePointer";

const vertexShader = /* glsl */ `
void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

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
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p = rot * p * 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    vec2 mouse = vec2(uMouse.x * uRes.x / uRes.y, uMouse.y) * 0.5;

    float t = uTime * 0.06;

    vec2 p = uv * 1.5;
    float q = fbm(p + vec2(t, -t * 0.6));
    float r = fbm(p + q * 1.6 + vec2(-t * 0.8, t * 0.4) + mouse * 0.6);
    float f = fbm(p + r * 1.8);

    vec3 ink = vec3(0.039, 0.039, 0.035);
    vec3 smoke = vec3(0.11, 0.115, 0.09);
    vec3 acid = vec3(0.784, 0.953, 0.114);

    vec3 color = mix(ink, smoke, smoothstep(0.28, 0.9, f));
    color += acid * pow(smoothstep(0.52, 0.95, r), 3.0) * 0.30 * uBoost;
    color += acid * pow(smoothstep(0.62, 1.0, f), 5.0) * 0.18 * uBoost;

    float d = length(uv - mouse);
    color += acid * exp(-d * 2.6) * 0.06 * uBoost;

    color *= 1.0 - dot(uv * 0.85, uv * 0.85);

    gl_FragColor = vec4(color, 1.0);
}
`;

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
        if (autoMode) return;
        const onMove = (event: MouseEvent) => {
            target.current.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -((event.clientY / window.innerHeight) * 2 - 1)
            );
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, [autoMode]);

    useFrame((state) => {
        const material = materialRef.current;
        if (!material) return;
        const t = state.clock.elapsedTime;
        material.uniforms.uTime.value = t;
        material.uniforms.uRes.value.set(
            size.width * viewport.dpr,
            size.height * viewport.dpr
        );
        // On touch devices the light wanders on its own and burns brighter
        material.uniforms.uBoost.value = autoMode ? 1.9 : 1.0;
        if (autoMode) {
            target.current.set(
                Math.sin(t * 0.3) * 0.75,
                Math.sin(t * 0.22 + 1.3) * 0.55
            );
        }
        mouse.current.lerp(target.current, 0.045);
        material.uniforms.uMouse.value.copy(mouse.current);
    });

    return (
        <mesh frustumCulled={false}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
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
        <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0 }}
        >
            <ShaderPlane autoMode={coarsePointer} />
        </Canvas>
    );
}
