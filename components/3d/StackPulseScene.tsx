"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PointMaterial, Points } from "@react-three/drei";
import type { Group, Mesh, Points as ThreePoints } from "three";

function CubeCore() {
    const groupRef = useRef<Group>(null);
    const cubeRef = useRef<Mesh>(null);
    const frameARef = useRef<Mesh>(null);
    const frameBRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.22;
            groupRef.current.rotation.x = Math.sin(time * 0.42) * 0.08;
        }

        if (cubeRef.current) {
            cubeRef.current.rotation.x += delta * 0.1;
            cubeRef.current.rotation.z -= delta * 0.12;
            const pulse = 1 + Math.sin(time * 1.5) * 0.025;
            cubeRef.current.scale.setScalar(pulse);
        }

        if (frameARef.current) {
            frameARef.current.rotation.z += delta * 0.36;
        }

        if (frameBRef.current) {
            frameBRef.current.rotation.y -= delta * 0.28;
            frameBRef.current.rotation.x += delta * 0.09;
        }
    });

    return (
        <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.7}>
            <group ref={groupRef}>
                <mesh ref={cubeRef} scale={1.18}>
                    <boxGeometry args={[1.3, 1.3, 1.3, 18, 18, 18]} />
                    <MeshDistortMaterial
                        color="#0b0f16"
                        distort={0.24}
                        speed={2.1}
                        roughness={0.16}
                        metalness={0.9}
                    />
                </mesh>

                <mesh ref={frameARef} scale={1.58}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="#dce8ff" wireframe transparent opacity={0.2} />
                </mesh>

                <mesh ref={frameBRef} scale={1.34} rotation={[0.48, 0.42, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="#f6f9ff" wireframe transparent opacity={0.12} />
                </mesh>
            </group>
        </Float>
    );
}

function CubeHalo() {
    const pointsRef = useRef<ThreePoints>(null);

    const positions = useMemo(() => {
        const count = 420;
        const coords = new Float32Array(count * 3);

        for (let i = 0; i < count; i += 1) {
            const t = i / count;
            const angle = i * 2.399963229728653;
            const radius = 2.15 + Math.sin(i * 0.37) * 0.22;
            const lift = (t - 0.5) * 2 + Math.sin(i * 0.24) * 0.12;

            coords[i * 3] = Math.cos(angle) * radius;
            coords[i * 3 + 1] = lift;
            coords[i * 3 + 2] = Math.sin(angle) * radius;
        }

        return coords;
    }, []);

    useFrame((_, delta) => {
        if (!pointsRef.current) {
            return;
        }

        pointsRef.current.rotation.y += delta * 0.11;
        pointsRef.current.rotation.x -= delta * 0.03;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#edf3ff"
                size={0.012}
                sizeAttenuation
                depthWrite={false}
                opacity={0.38}
            />
        </Points>
    );
}

export function StackPulseScene() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 4.9], fov: 46 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[2.8, 2.2, 3.2]} intensity={1.1} color="#ffffff" />
                <pointLight position={[-2.3, -1.8, -2.6]} intensity={0.5} color="#8fb7ff" />

                <CubeHalo />
                <CubeCore />
            </Canvas>
        </div>
    );
}
