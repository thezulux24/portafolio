"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView } from "framer-motion";
import * as THREE from "three";

function seededNoise(seed: number) {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
}

function RetroGrid() {
    const frontRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
    const backRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

    useFrame((state) => {
        const travel = (state.clock.getElapsedTime() * 1.8) % 14;

        if (frontRef.current) {
            frontRef.current.position.z = travel - 7;
        }

        if (backRef.current) {
            backRef.current.position.z = travel - 21;
        }
    });

    return (
        <group rotation={[-Math.PI / 2.45, 0, 0]} position={[0, -2.3, -8]}>
            <mesh ref={frontRef}>
                <planeGeometry args={[28, 28, 32, 32]} />
                <meshBasicMaterial color="#c8f31d" wireframe transparent opacity={0.12} />
            </mesh>
            <mesh ref={backRef}>
                <planeGeometry args={[28, 28, 32, 32]} />
                <meshBasicMaterial color="#ece9e1" wireframe transparent opacity={0.07} />
            </mesh>
        </group>
    );
}

function RetroParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 900;

    const positions = useMemo(() => {
        const values = new Float32Array(count * 3);

        for (let index = 0; index < count; index += 1) {
            const x = (seededNoise(index + 11) - 0.5) * 26;
            const y = (seededNoise(index + 29) - 0.5) * 16;
            const z = (seededNoise(index + 53) - 0.5) * 20;

            const offset = index * 3;
            values[offset] = x;
            values[offset + 1] = y;
            values[offset + 2] = z;
        }

        return values;
    }, [count]);

    useFrame((_, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.03;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                transparent
                color="#c8f31d"
                size={0.032}
                sizeAttenuation
                depthWrite={false}
                opacity={0.32}
            />
        </points>
    );
}

function SceneContent() {
    const { viewport } = useThree();
    const scale = viewport.width < 7 ? 0.82 : 1;

    return (
        <group scale={scale}>
            <RetroGrid />
            <RetroParticles />
        </group>
    );
}

export function CvLoadingScene() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapperRef, { margin: "100px" });

    return (
        <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-0">
            <Canvas
                camera={{ position: [0, 1.4, 7], fov: 58 }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 1.25]}
                frameloop={inView ? "always" : "never"}
            >
                <color attach="background" args={["#0a0a09"]} />
                <fog attach="fog" args={["#0a0a09", 6, 18]} />
                <SceneContent />
            </Canvas>
        </div>
    );
}
