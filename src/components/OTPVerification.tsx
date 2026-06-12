"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, RefreshCw, CheckCircle } from "lucide-react";
import clsx from "clsx";

interface OTPVerificationProps {
  type: "phone" | "email";
  target: string;
  onVerified: () => void;
  onSendOTP: () => string;
  onVerifyOTP: (code: string) => boolean;
  className?: string;
}

export default function OTPVerification({
  type,
  target,
  onVerified,
  onSendOTP,
  onVerifyOTP,
  className,
}: OTPVerificationProps) {
  const [step, setStep] = useState<"idle" | "sent" | "verified">("idle");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [currentOTP, setCurrentOTP] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSend = () => {
    const code = onSendOTP();
    setCurrentOTP(code);
    setStep("sent");
    setTimer(120);
    setError("");
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const handleResend = () => {
    if (timer > 0) return;
    const code = onSendOTP();
    setCurrentOTP(code);
    setTimer(120);
    setError("");
    setOtp(["", "", "", "", "", ""]);
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify when all digits entered
    const fullCode = newOtp.join("");
    if (fullCode.length === 6) {
      const isValid = onVerifyOTP(fullCode);
      if (isValid) {
        setStep("verified");
        onVerified();
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (step === "verified") {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={clsx("flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2.5 rounded-xl", className)}
      >
        <CheckCircle size={18} />
        <span className="text-sm font-medium">
          {type === "phone" ? "Phone" : "Email"} verified successfully
        </span>
      </motion.div>
    );
  }

  if (step === "idle") {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSend}
        disabled={!target}
        className={clsx(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
          target
            ? "bg-accent/10 text-accent-dark hover:bg-accent/20"
            : "bg-gray-100 text-gray-400 cursor-not-allowed",
          className
        )}
      >
        <Shield size={16} />
        Verify {type === "phone" ? "Phone" : "Email"}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className={clsx("space-y-3", className)}
    >
      <p className="text-sm text-gray-600">
        Enter the 6-digit OTP sent to your {type === "phone" ? "phone" : "email"}
      </p>
      <p className="text-xs text-primary-500 font-medium bg-primary-50 px-3 py-1.5 rounded-lg inline-block">
        Your OTP: {currentOTP}
      </p>
      <div className="flex gap-2 justify-center">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-10 h-12 text-center text-lg font-bold rounded-xl border-2 border-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white"
          />
        ))}
      </div>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {timer > 0
            ? `Resend in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`
            : ""}
        </span>
        <button
          onClick={handleResend}
          disabled={timer > 0}
          className={clsx(
            "flex items-center gap-1 text-xs font-medium transition-all",
            timer > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-accent-dark hover:text-accent"
          )}
        >
          <RefreshCw size={12} />
          Resend OTP
        </button>
      </div>
    </motion.div>
  );
}
