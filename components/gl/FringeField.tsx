"use client";

import { useEffect, useRef } from "react";
import { field } from "@/lib/scene";

const VERT = /* glsl */ `#version 300 es
in vec2 aPos;
void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// A hologram plate records an object as the interference of two wavefronts.
// This draws that record: fringes between a wave centred on the pointer and
// one centred on a per-section source, dispersed into the spectrum.
const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uSrc;
uniform vec3 uAccent;
uniform float uGain;
uniform float uDensity;
uniform float uScroll;

out vec4 outColor;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = p * 2.03 + 17.1;
        a *= 0.5;
    }
    return v;
}

vec3 spectrum(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float t = uTime;

    // The plate breathes: a slow warp so the fringes never sit still.
    vec2 q = vec2(fbm(uv * 1.2 + vec2(0.0, t * 0.03)), fbm(uv * 1.2 + vec2(5.2, -t * 0.025)));
    vec2 w = uv + 0.055 * (q - 0.5);

    float d1 = length(w - uPointer);
    float d2 = length(w - uSrc);
    float k = 132.0 * uDensity;

    // Object beam against reference beam.
    float phase = (d1 - d2) * k + uScroll * 5.0 - t * 0.22;
    float fringe = pow(0.5 + 0.5 * cos(phase), 11.0);

    // A second, slanted plane wave gives the moire its weave.
    float phase2 = dot(w, vec2(0.78, 0.62)) * k * 0.5 + d2 * k * 0.42 + t * 0.12;
    float weave = pow(0.5 + 0.5 * cos(phase2), 18.0);

    float m = fbm(uv * 0.85 + vec2(t * 0.018, 0.0));
    float envelope = smoothstep(1.5, 0.05, d1) * 0.55 + smoothstep(1.7, 0.15, d2) * 0.6;
    float intensity = (fringe * 0.8 + weave * 0.4) * envelope * (0.3 + 0.95 * m);

    float angle = atan(w.y - uSrc.y, w.x - uSrc.x);
    vec3 disp = spectrum(phase * 0.028 + angle * 0.14 + m * 0.45);
    vec3 light = mix(disp, uAccent, 0.58);

    vec3 ground = mix(vec3(0.020, 0.026, 0.066), vec3(0.036, 0.047, 0.115), smoothstep(-0.55, 0.65, uv.y + (m - 0.5) * 0.5));
    float halo = smoothstep(1.15, 0.0, d2);
    ground += uAccent * halo * halo * 0.085;

    vec3 col = ground + light * intensity * 0.42 * uGain;
    col *= 1.0 - 0.32 * dot(uv, uv);
    col += (hash(gl_FragCoord.xy + fract(t) * 91.7) - 0.5) / 255.0 * 2.0;

    outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

/** Fixed full-viewport interference field. One draw call, no library. */
export function FringeField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
        if (!gl) return;

        const vs = compile(gl, gl.VERTEX_SHADER, VERT);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const u = (name: string) => gl.getUniformLocation(program, name);
        const loc = {
            res: u("uRes"),
            time: u("uTime"),
            pointer: u("uPointer"),
            src: u("uSrc"),
            accent: u("uAccent"),
            gain: u("uGain"),
            density: u("uDensity"),
            scroll: u("uScroll"),
        };

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: -0.45, y: 0.12, tx: -0.45, ty: 0.12 };
        let width = 0;
        let height = 0;

        const resize = () => {
            // The field is soft by nature: render below device resolution.
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = Math.round(window.innerWidth * dpr);
            height = Math.round(window.innerHeight * dpr);
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, width, height);
        };

        const onPointer = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            pointer.tx = (event.clientX - window.innerWidth / 2) / window.innerHeight;
            pointer.ty = -(event.clientY - window.innerHeight / 2) / window.innerHeight;
        };

        const draw = (time: number) => {
            pointer.x += (pointer.tx - pointer.x) * 0.045;
            pointer.y += (pointer.ty - pointer.y) * 0.045;
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

            gl.uniform2f(loc.res, width, height);
            gl.uniform1f(loc.time, reduce ? 12 : time / 1000);
            gl.uniform2f(loc.pointer, pointer.x, pointer.y);
            gl.uniform2f(loc.src, field.srcX, field.srcY);
            gl.uniform3f(loc.accent, field.accent[0], field.accent[1], field.accent[2]);
            gl.uniform1f(loc.gain, field.gain);
            gl.uniform1f(loc.density, field.density);
            gl.uniform1f(loc.scroll, window.scrollY / max);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        let raf = 0;
        let running = false;
        const loop = (time: number) => {
            draw(time);
            raf = requestAnimationFrame(loop);
        };
        const start = () => {
            if (running || document.hidden) return;
            running = true;
            raf = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(raf);
        };
        const onVisibility = () => (document.hidden ? stop() : start());

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        // Reduced motion still follows scroll and section hue, on a frozen clock.
        start();

        return () => {
            stop();
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onPointer);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 h-full w-full"
            style={{ background: "radial-gradient(120% 90% at 70% 30%, oklch(0.2 0.05 250), var(--void) 70%)" }}
        />
    );
}
