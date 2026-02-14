"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Terrain() {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Animate the terrain flowing
        meshRef.current.position.z = (time * 0.5) % 2;
    });

    return (
        <group rotation={[-Math.PI / 2 + 0.5, 0, 0]} position={[0, -2, 0]}>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <planeGeometry args={[40, 40, 50, 50]} />
                <meshStandardMaterial
                    color="#222"
                    wireframe
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Second grid for seamless loop illusion */}
            <mesh position={[0, -20, 0]}>
                {/* Note: In rotated space, 'y' is 'z' relative to the plane connection, but let's just make one big plane or handle looping carefully. 
             Actually simplified: just a moving grid.
         */}
            </mesh>
        </group>
    );
}

function MovingGrid() {
    const gridRef = useRef<any>(null);

    useFrame((state) => {
        if (!gridRef.current) return;
        // Move the grid towards the camera to create a "forward motion" effect
        gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1;
    });

    return (
        <group rotation={[Math.PI / 2.5, 0, 0]} position={[0, 3, -5]}>
            <gridHelper args={[60, 60, 0x444444, 0x222222]} ref={gridRef} />
        </group>
    );
}

function Particles() {
    const ref = useRef<any>(null);
    // Create a wider field of gentle particles
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#666" transparent opacity={0.4} sizeAttenuation={true} />
        </points>
    )
}

export function ContactScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.2} />
                <fog attach="fog" args={['#000000', 5, 20]} />
                <MovingGrid />
                <Particles />
            </Canvas>
        </div>
    );
}
