"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useLanguageStore } from "@/lib/store";

/** Acid wireframe padlock with an orbital bone ring — matches the site 3D language. */
function WirePadlock() {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.55;
            groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.35;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Body */}
            <mesh position={[0, -0.35, 0]}>
                <boxGeometry args={[1.5, 1.15, 0.7]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.85} />
            </mesh>

            {/* Shackle */}
            <mesh position={[0, 0.42, 0]}>
                <torusGeometry args={[0.48, 0.09, 12, 40, Math.PI]} />
                <meshBasicMaterial wireframe color="#c8f31d" transparent opacity={0.85} />
            </mesh>

            {/* Keyhole */}
            <mesh position={[0, -0.28, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
                <meshBasicMaterial color="#ece9e1" />
            </mesh>
            <mesh position={[0, -0.46, 0.36]}>
                <boxGeometry args={[0.07, 0.22, 0.05]} />
                <meshBasicMaterial color="#ece9e1" />
            </mesh>

            {/* Orbital ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
                <torusGeometry args={[1.55, 0.012, 8, 90]} />
                <meshBasicMaterial color="#ece9e1" transparent opacity={0.22} />
            </mesh>
        </group>
    );
}

function PadlockScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
        >
            <WirePadlock />
        </Canvas>
    );
}

interface PrivateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectTitle?: string;
}

export function PrivateProjectModal({ isOpen, onClose, projectTitle = "This project" }: PrivateProjectModalProps) {
    const { t } = useLanguageStore();
    const body = t.private.body.replace("{project}", projectTitle);

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
                        className="absolute inset-0 cursor-pointer bg-ink/85 backdrop-blur-md"
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 16 }}
                        transition={{ type: "spring", damping: 26, stiffness: 320 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-acid/25 bg-ink shadow-2xl shadow-acid/10"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-20 rounded-lg border border-bone/15 p-1.5 text-bone/50 transition-colors hover:border-acid/50 hover:text-acid"
                        >
                            <X size={18} />
                        </button>

                        {/* 3D scene */}
                        <div className="relative h-56 w-full">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(200,243,29,0.10),transparent_60%)]" />
                            <div className="absolute inset-0">
                                <PadlockScene />
                            </div>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-acid/40 to-transparent" />
                        </div>

                        <div className="space-y-4 p-8 pt-6 text-center">
                            <div className="inline-flex items-center justify-center rounded-full border border-acid/30 bg-acid/10 p-3 text-acid">
                                <Lock size={20} />
                            </div>

                            <h3 className="font-display text-2xl font-extrabold tracking-tight text-bone">
                                {t.private.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-bone/60">
                                <span className="font-medium text-acid">{projectTitle}</span>
                                {body.startsWith(projectTitle) ? body.slice(projectTitle.length) : ` — ${body}`}
                            </p>

                            <div className="pt-3">
                                <button
                                    onClick={onClose}
                                    className="rounded-full bg-acid px-7 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-transform duration-300 hover:scale-[1.04]"
                                >
                                    {t.private.button}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
