"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import OTPVerification from "@/components/OTPVerification";
import { useAuth } from "@/lib/auth-context";
import { createUser, saveVerifiedNumber, saveVerifiedEmail } from "@/lib/db";
import { validateFullName, validateEmail, validatePhone, validatePassword } from "@/lib/validation";
import { sendPhoneOTP, verifyPhoneOTP, sendEmailOTP, verifyEmailOTP } from "@/lib/verification";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateFullName(form.fullName);
    if (nameErr) newErrors.fullName = nameErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    const phoneErr = validatePhone(form.mobile);
    if (phoneErr) newErrors.mobile = phoneErr;
    const passErr = validatePassword(form.password);
    if (passErr) newErrors.password = passErr;
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!phoneVerified) newErrors.phone_verify = "Phone verification required";
    if (!emailVerified) newErrors.email_verify = "Email verification required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const user = await createUser({
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        createdAt: new Date().toISOString(),
      });
      await saveVerifiedNumber(form.mobile);
      await saveVerifiedEmail(form.email);
      login(user);
      router.push("/profile");
    } catch (err: unknown) {
      setGlobalError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="min-h-screen py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">
              Join MOM & BABY Polyclinic Handwara
            </p>
          </div>

          <GlassCard hover={false} className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {globalError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                  {globalError}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setEmailVerified(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
                {!emailVerified && !validateEmail(form.email) && (
                  <OTPVerification
                    type="email"
                    target={form.email}
                    onVerified={() => setEmailVerified(true)}
                    onSendOTP={() => sendEmailOTP(form.email)}
                    onVerifyOTP={(code) => verifyEmailOTP(form.email, code)}
                    className="mt-2"
                  />
                )}
                {errors.email_verify && !emailVerified && (
                  <p className="text-sm text-red-500 mt-1">{errors.email_verify}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm({ ...form, mobile: val });
                    setPhoneVerified(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
                {errors.mobile && (
                  <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
                )}
                {!phoneVerified && !validatePhone(form.mobile) && (
                  <OTPVerification
                    type="phone"
                    target={form.mobile}
                    onVerified={() => setPhoneVerified(true)}
                    onSendOTP={() => sendPhoneOTP(form.mobile)}
                    onVerifyOTP={(code) => verifyPhoneOTP(form.mobile, code)}
                    className="mt-2"
                  />
                )}
                {errors.phone_verify && !phoneVerified && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone_verify}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all disabled:opacity-50"
              >
                <UserPlus size={18} />
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-500 font-medium hover:text-primary-600"
                >
                  Login here
                </Link>
              </p>
            </form>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
