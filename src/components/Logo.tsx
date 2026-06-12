"use client";

import Image from "next/image";
import clsx from "clsx";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Logo({ size = 40, className, showText = true }: LogoProps) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <Image
        src="/logo.png"
        alt="MOM & BABY Polyclinic"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-primary-600 text-sm md:text-base tracking-tight">
            MOM & BABY
          </span>
          <span className="text-[10px] md:text-xs text-primary-400 font-medium -mt-0.5">
            Polyclinic Handwara
          </span>
        </div>
      )}
    </div>
  );
}
