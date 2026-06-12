"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={clsx(
        "bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg shadow-primary-100/20",
        "transition-shadow duration-300",
        hover && "hover:shadow-xl hover:shadow-primary-200/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
