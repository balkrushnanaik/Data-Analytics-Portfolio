import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import * as THREE from "three";

// ── 3D Earth Globe ──
function Earth() {
  const meshRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.003;
    }
  });

  return (
    <group>
      {/* Main planet */}
      <Sphere ref={meshRef} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#0D1B2A"
          emissive="#003366"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          distort={0.08}
          speed={2}
          wireframe={false}
        />
      </Sphere>

      {/* Glowing atmosphere */}
      <Sphere args={[1.75, 32, 32]}>
        <meshStandardMaterial
          color="#00D4FF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Orbit ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 5, Math.PI / 6, 0]}>
        <torusGeometry args={[2.9, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={1}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Satellite dot on ring 1 */}
      <SatelliteDot
        radius={2.4}
        speed={0.8}
        tiltX={Math.PI / 3}
        color="#00D4FF"
      />
      <SatelliteDot
        radius={2.9}
        speed={-0.5}
        tiltX={Math.PI / 5}
        color="#8B5CF6"
      />
    </group>
  );
}

function SatelliteDot({ radius, speed, tiltX, color }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t) * radius * Math.sin(tiltX);
      ref.current.position.z = Math.sin(t) * radius * Math.cos(tiltX);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
      />
    </mesh>
  );
}

// ── Scene Wrapper ──
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#00D4FF" />
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.5}
        color="#8B5CF6"
      />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#ffffff" />
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <Earth />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

// ── Floating Stat Card ──
const StatCard = ({ value, label, delay }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
  >
    <div
      className="font-orbitron text-2xl font-bold"
      style={{ color: "var(--neon-blue)" }}
    >
      {value}
    </div>
    <div
      className="text-xs mt-1"
      style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
    >
      {label}
    </div>
  </motion.div>
);

// ── Hero Section ──
export default function Hero() {
  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "5rem" }}
    >
      {/* 3D Canvas — right half */}
      <div
        className="absolute inset-0"
        style={{ right: 0, left: "45%", zIndex: 2 }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content — left half */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              fontFamily: "JetBrains Mono",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--neon-cyan)",
                boxShadow: "0 0 8px var(--neon-cyan)",
                display: "inline-block",
              }}
            />
            <span className="text-xs" style={{ color: "var(--neon-cyan)" }}>
              Available for Data Analyst Roles
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-orbitron font-bold mb-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              lineHeight: 1.15,
              color: "#fff",
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Hi, I'm <span className="gradient-text">Balkrushna Naik</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            className="font-orbitron mb-6"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              minHeight: "2.5rem",
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)" }}>I'm a </span>
            <TypeAnimation
              sequence={[
                "Data Analyst",
                2000,
                "Python Developer",
                2000,
                "Power BI Developer",
                2000,
                "Data Visualizer",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ color: "var(--neon-blue)" }}
            />
          </motion.div>

          {/* Intro */}
          <motion.p
            className="mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1rem",
              maxWidth: 520,
            }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Computer Engineering student at SPPU, passionate about Data
            Analytics, Business Intelligence, and Visualization. I turn complex
            datasets into meaningful insights that drive real business
            decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a
              href="/resume.pdf"
              download
              className="neon-btn neon-btn-solid"
              style={{ textDecoration: "none", color: "#000" }}
            >
              ↓ Download Resume
            </a>
            <button
              className="neon-btn"
              onClick={() =>
                document
                  .getElementById("projects")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </button>
            <button
              className="neon-btn neon-btn-purple"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <StatCard value="10+" label="Projects" delay={0.5} />
            <StatCard value="Python" label="Primary Lang" delay={0.6} />
            <StatCard value="PowerBI" label="BI Tool" delay={0.7} />
            <StatCard value="7.5" label="CGPA" delay={0.8} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ zIndex: 10 }}
      >
        <span
          className="font-mono-code text-xs"
          style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
