"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/lib/auth-context";
import { getUserByEmail } from "@/lib/db";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        setError("No account found with this email");
        return;
      }
      if (user.password !== password) {
        setError("Incorrect password");
        return;
      }
      login(user);
      router.push("/profile");
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="min-h-screen py-16 md:py-24 relative flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-md mx-auto px-4 w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">
              Login to MOM & BABY Polyclinic
            </p>
          </div>

          <GlassCard hover={false} className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all disabled:opacity-50"
              >
                <LogIn size={18} />
                {loading ? "Logging in..." : "Login"}
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary-500 font-medium hover:text-primary-600"
                >
                  Register here
                </Link>
              </p>
            </form>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
