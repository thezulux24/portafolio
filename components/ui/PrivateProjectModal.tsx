"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function SecurityLock() {
    const groupRef = useRef<any>(null);
    const padlockRef = useRef<any>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Floating animation
            groupRef.current.position.y = Math.sin(time / 1.5) * 0.2;
            groupRef.current.rotation.y = Math.sin(time / 2) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Padlock Body */}
                <mesh position={[0, -0.5, 0]}>
                    <boxGeometry args={[1.8, 1.5, 0.8, 10, 10, 10]} />
                    <MeshDistortMaterial
                        color="#ff3333"
                        speed={2}
                        distort={0.4}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Shackle */}
                <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.6, 0.2, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.1} />
                </mesh>

                {/* Shackle Legs (to connect torus to body) */}
                <mesh position={[-0.6, 0.5, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
                    <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.1} />
                </mesh>
                <mesh position={[0.6, 0.5, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
                    <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.1} />
                </mesh>

                {/* Keyhole */}
                <group position={[0, -0.5, 0.41]}>
                    <mesh>
                        <circleGeometry args={[0.2, 32]} />
                        <meshBasicMaterial color="#000" />
                    </mesh>
                    <mesh position={[0, -0.2, 0]}>
                        <planeGeometry args={[0.15, 0.3]} />
                        <meshBasicMaterial color="#000" />
                    </mesh>
                </group>

                {/* 3D Text Warning */}
                <Text
                    position={[0, -2, 0]}
                    fontSize={0.4}
                    color="#ff3333"
                    anchorX="center"
                    anchorY="middle"
                >
                    ACCESS DENIED
                </Text>
            </Float>
        </group>
    );
}

function SecurityScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 0, 10]} angle={0.3} penumbra={1} intensity={2} color="#ff0000" />

            <SecurityLock />
        </Canvas>
    );
}

interface PrivateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PrivateProjectModal({ isOpen, onClose }: PrivateProjectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-red-900/50 rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="h-64 w-full bg-gradient-to-b from-red-950/20 to-transparent relative">
                            {/* 3D Scene */}
                            <div className="absolute inset-0 z-10">
                                <SecurityScene />
                            </div>

                            {/* Background Grid Patterns */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                        </div>

                        <div className="p-8 text-center space-y-4 relative z-20 bg-[#0a0a0a]">
                            <div className="inline-flex items-center justify-center p-3 rounded-full bg-red-500/10 text-red-500 mb-2">
                                <Lock size={24} />
                            </div>

                            <h3 className="text-2xl font-bold text-white font-heading">
                                Private Project
                            </h3>

                            <p className="text-muted-foreground leading-relaxed">
                                This project (<span className="text-white font-medium">PyP Camiones</span>) is protected by a Non-Disclosure Agreement (NDA).
                                The source code and application access are restricted to authorized personnel only.
                            </p>

                            <div className="pt-4">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors text-sm font-medium"
                                >
                                    Understood
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
