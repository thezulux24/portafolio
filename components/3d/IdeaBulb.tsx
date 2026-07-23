"use client";

import { useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useInView } from "framer-motion";
import * as THREE from "three";

function Bulb() {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.45;
            groupRef.current.position.y = Math.sin(t * 1.1) * 0.12;
        }

        // The inner spark "thinks": it breathes with a slow pulse
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(t * 2.6) * 0.28);
            coreRef.current.rotation.y -= delta * 1.4;
        }

        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Glass bulb */}
            <mesh position={[0, 0.35, 0]} scale={[1, 1.12, 1]}>
                <sphereGeometry args={[0.72, 18, 14]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.5} />
            </mesh>

            {/* Neck taper */}
            <mesh position={[0, -0.38, 0]}>
                <cylinderGeometry args={[0.34, 0.42, 0.28, 14, 1, true]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Screw base */}
            <mesh position={[0, -0.62, 0]}>
                <cylinderGeometry args={[0.34, 0.34, 0.1, 14, 1, true]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.74, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.1, 14, 1, true]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.86, 0]}>
                <cylinderGeometry args={[0.22, 0.26, 0.1, 14, 1, true]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* The idea spark */}
            <mesh ref={coreRef} position={[0, 0.32, 0]}>
                <icosahedronGeometry args={[0.16, 0]} />
                <meshBasicMaterial wireframe color="#ece9e1" transparent opacity={0.95} />
            </mesh>

            {/* Orbital ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
                <torusGeometry args={[1.4, 0.012, 8, 90]} />
                <meshBasicMaterial color="#ece9e1" transparent opacity={0.18} />
            </mesh>
        </group>
    );
}

function subscribeReducedMotion(callback: () => void) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
}

export function IdeaBulb({ className }: { className?: string }) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapperRef, { margin: "120px" });
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        () => false
    );

    if (reducedMotion) return null;

    return (
        <div ref={wrapperRef} className={className} aria-hidden>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                frameloop={inView ? "always" : "never"}
            >
                <Bulb />
            </Canvas>
        </div>
    );
}
