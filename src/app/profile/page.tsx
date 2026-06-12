"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  ChevronRight,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="min-h-screen py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
              <span className="text-2xl font-bold text-white">
                {user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {user.fullName}
            </h1>
            <p className="text-gray-500 mt-1">Welcome back!</p>
          </div>

          <div className="space-y-4">
            <GlassCard hover={false} className="p-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <User size={18} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Full Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.fullName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mail size={18} className="text-accent-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Phone size={18} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Mobile</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.mobile}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <Link href="/my-appointments">
              <GlassCard className="p-5 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Calendar size={18} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        My Appointments
                      </p>
                      <p className="text-xs text-gray-500">
                        View and manage your appointments
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </GlassCard>
            </Link>

            <Link href="/appointments">
              <GlassCard className="p-5 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Calendar size={18} className="text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Book New Appointment
                      </p>
                      <p className="text-xs text-gray-500">
                        Schedule a visit with our doctors
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </GlassCard>
            </Link>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors border border-red-100 mt-6"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
