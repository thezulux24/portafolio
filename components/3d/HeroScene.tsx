"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    MeshDistortMaterial,
    Sphere,
    Points,
    PointMaterial,
    Environment
} from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<any>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Base distortion + hover intensity
        const targetDistort = hovered ? 0.8 : 0.4;
        // Base scale + hover scale
        const targetScale = hovered ? 1.8 : 1.5;

        meshRef.current.distort = THREE.MathUtils.lerp(
            meshRef.current.distort,
            targetDistort + Math.sin(time / 2) / 4,
            0.05
        );

        // Smoothly interpolate scale
        // Note: meshRef.current.parent is the sphere mesh, but meshRef is the material. 
        // We need to scale the parent mesh or use the scale prop on Sphere if controlled here.
        // Easier to use state for the Sphere component props or ref the Mesh.
    });

    // Spring animation for scale using standard React Three Fiber / Drei approach is tricky inside per-frame logic without springs.
    // But we can just use the hovered state in the component render or useFrame to lerp scale if we had a ref to the mesh.
    // For simplicity, let's just create a ref for the Sphere mesh too.
    const sphereRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (sphereRef.current) {
            const targetScale = hovered ? 1.8 : 1.5;
            sphereRef.current.scale.x = THREE.MathUtils.lerp(sphereRef.current.scale.x, targetScale, delta * 2);
            sphereRef.current.scale.y = THREE.MathUtils.lerp(sphereRef.current.scale.y, targetScale, delta * 2);
            sphereRef.current.scale.z = THREE.MathUtils.lerp(sphereRef.current.scale.z, targetScale, delta * 2);
        }
    });


    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere
                ref={sphereRef}
                args={[1, 100, 200]}
                scale={1.5}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <MeshDistortMaterial
                    ref={meshRef}
                    color={hovered ? "#404040" : "#0a0a0a"}
                    attach="material"
                    distort={0.4}
                    speed={hovered ? 5 : 3}
                    roughness={0.1}
                    metalness={1}
                />
            </Sphere>
        </Float>
    );
}

function ParticleField() {
    const ref = useRef<any>(null);
    const count = 3000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta / 30;
            ref.current.rotation.y += delta / 35;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.01}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#444444" />

                <AnimatedSphere />
                <ParticleField />

                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
