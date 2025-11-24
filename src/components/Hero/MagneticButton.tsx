// components/MagneticButton.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  strength?: number; // độ hút chuột
}

export default function MagneticButton({
  children,
  strength = 50,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.25;
    const y = (clientY - top - height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0px, 0px)";
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
