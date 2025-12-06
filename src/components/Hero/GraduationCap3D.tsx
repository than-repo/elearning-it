// components/GraduationCap3D.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/graduation-cap.glb");

  return (
    // 1. Thu nhỏ model 50%  đổi scale từ 2.8 thành 1.4
    <primitive
      object={scene}
      scale={1.4} //  nhỏ lại 50%
      position={[0.8, -1.4, 0]} //
    />
  );
}

export default function GraduationCap3D() {
  const scroll = useScroll();
  const scale = useTransform(
    scroll.scrollYProgress,
    [0, 0.6],
    [1, 0.88]
  );
  const opacity = useTransform(
    scroll.scrollYProgress,
    [0, 0.6],
    [1, 0.92]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="pointer-events-none absolute right-[-1%] top-[42%] -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        className="bg-transparent"
      >
        {/* Ánh sáng đẹp nhất cho mũ tốt nghiệp */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[8, 12, 8]}
          intensity={1.8}
          color="#ffffff"
        />
        <directionalLight
          position={[-10, 10, -8]}
          intensity={0.9}
          color="#c084fc"
        />

        <Model />

        <ContactShadows
          position={[0, -3.5, 0]}
          opacity={0.5}
          scale={18}
          blur={2.5}
          far={10}
        />

        <Environment preset="studio" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </motion.div>
  );
}
