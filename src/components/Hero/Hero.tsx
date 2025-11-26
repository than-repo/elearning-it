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

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 md:px-16 lg:flex-row lg:items-center lg:justify-start lg:px-24 xl:px-32">
        {/* Nội dung chữ - luôn hiện, responsive đẹp */}
        <div className="relative z-10 max-w-4xl space-y-8 text-center lg:text-left">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl font-medium leading-tight text-white sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            {"Learn Anything".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.15,
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
            className="mx-auto max-w-2xl text-lg text-gray-400 lg:mx-0 lg:text-xl"
          >
            The smartest way to master new skills. Interactive
            courses, real-time feedback, and learning paths built for
            the modern mind.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start"
          >
            <MagneticButton>
              <a
                href="#"
                className="rounded-full bg-white px-10 py-4 text-black font-medium hover:scale-105 transition-all block text-center"
              >
                Get Started
              </a>
            </MagneticButton>

            <MagneticButton strength={30}>
              <a
                href="#"
                className="rounded-full border border-white/30 px-10 py-4 text-white backdrop-blur-sm hover:border-white/60 transition-all block text-center"
              >
                View Courses
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* CHỈ HIỆN 3D MODEL TỪ LAPTOP TRỞ LÊN (≥1024px) */}
        {/* Dùng hidden + lg:block → dưới lg sẽ KHÔNG mount component luôn → tiết kiệm 100% tài nguyên */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
            <GraduationCap3D />
          </div>
        </div>
      </div>
    </section>
  );
}
