// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import GraduationCap3D from "./GraduationCap3D";

export default function Hero() {
  return (
    <section className="relative min-h-screen  overflow-hidden bg-black">
      {/* Grainy noise background */}
      <div className="pointer-events-none fixed inset-0 opacity-50">
        <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-soft-light" />
      </div>

      <div className="relative z-20 flex min-h-screen items-center justify-start px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-4xl space-y-8">
          {/* Big title - reveal từng chữ */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl font-medium leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {"Learn Anything".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="bg-gradient-to-r from-cyan-100 to-blue-500 bg-clip-text text-transparent"
            >
              Anywhere.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="max-w-2xl text-lg text-gray-400 md:text-xl"
          >
            The smartest way to master new skills. Interactive
            courses, real-time feedback, and learning paths built for
            the modern mind.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#"
                className="rounded-full bg-white px-8 py-4 text-black font-medium transition-all hover:scale-105"
              >
                Get Started
              </a>
            </MagneticButton>

            <MagneticButton strength={30}>
              <a
                href="#"
                className="rounded-full border border-white/30 px-8 py-4 text-white backdrop-blur-sm transition-all hover:border-white/60"
              >
                View Courses
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <GraduationCap3D />
      </div>
    </section>
  );
}
