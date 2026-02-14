"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function seededNoise(seed: number) {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
}

function RetroGrid() {
    const frontRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
    const backRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

    useFrame((state) => {
        const travel = (state.clock.getElapsedTime() * 2.2) % 14;

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
                <planeGeometry args={[28, 28, 40, 40]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
            </mesh>
            <mesh ref={backRef}>
                <planeGeometry args={[28, 28, 40, 40]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
            </mesh>
        </group>
    );
}

function RetroParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);
    const count = 1600;

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

    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.035;
        }

        if (materialRef.current) {
            materialRef.current.opacity = 0.33 + Math.sin(state.clock.getElapsedTime() * 1.8) * 0.09;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                transparent
                color="#f5f5f5"
                size={0.03}
                sizeAttenuation
                depthWrite={false}
                opacity={0.36}
            />
        </points>
    );
}

function PulseCore() {
    const coreRef = useRef<THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>>(null);

    useFrame((state) => {
        if (!coreRef.current) {
            return;
        }

        const time = state.clock.getElapsedTime();
        const scale = 0.95 + Math.sin(time * 2.6) * 0.12;
        coreRef.current.scale.setScalar(scale);
        coreRef.current.rotation.y += 0.004;
        coreRef.current.rotation.x += 0.002;
    });

    return (
        <mesh ref={coreRef} position={[0, 1.2, -3]}>
            <icosahedronGeometry args={[0.72, 1]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.22} />
        </mesh>
    );
}

function SceneContent() {
    const { viewport } = useThree();
    const scale = viewport.width < 7 ? 0.82 : 1;

    return (
        <group scale={scale}>
            <RetroGrid />
            <RetroParticles />
            <PulseCore />
        </group>
    );
}

export function CvLoadingScene() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 1.4, 7], fov: 58 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={["#030303"]} />
                <fog attach="fog" args={["#030303", 6, 18]} />
                <ambientLight intensity={0.45} />
                <pointLight position={[0, 2, 2]} intensity={1.1} color="#ffffff" />
                <pointLight position={[0, -3, -4]} intensity={0.55} color="#8a8a8a" />
                <SceneContent />
            </Canvas>
        </div>
    );
}
