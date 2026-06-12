"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  X,
  RefreshCw,
  Plus,
  AlertTriangle,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/lib/auth-context";
import { Appointment, getAppointmentsByUser, updateAppointment } from "@/lib/db";

export default function MyAppointmentsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppts, setLoadingAppts] = useState(true);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user?.id) {
        const appts = await getAppointmentsByUser(user.id);
        setAppointments(appts);
        setLoadingAppts(false);
      }
    };
    fetchAppointments();
  }, [user]);

  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments.filter(
    (a) => a.status === "upcoming" && a.date >= today
  );
  const past = appointments.filter(
    (a) => a.status === "upcoming" && a.date < today
  );
  const cancelled = appointments.filter((a) => a.status === "cancelled");

  const handleCancel = async (id: number) => {
    const appt = appointments.find((a) => a.id === id);
    if (appt) {
      await updateAppointment({ ...appt, status: "cancelled" });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
      );
    }
    setCancelId(null);
  };

  const handleReschedule = (appt: Appointment) => {
    router.push(
      `/appointments?reschedule=${appt.id}&doctor=${encodeURIComponent(appt.doctor)}&type=${encodeURIComponent(appt.appointmentType)}`
    );
  };

  const displayList =
    tab === "upcoming" ? upcoming : tab === "past" ? past : cancelled;

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

        <div className="relative max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Appointments
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your appointments
              </p>
            </div>
            <Link href="/appointments">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium shadow-md"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New</span>
              </motion.button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 p-1 mb-6">
            {(["upcoming", "past", "cancelled"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === "upcoming" && upcoming.length > 0 && (
                  <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-md text-xs">
                    {upcoming.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          {loadingAppts ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : displayList.length === 0 ? (
            <GlassCard hover={false} className="p-8 text-center">
              <Calendar size={40} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {tab} appointments
              </h3>
              <p className="text-gray-500 mb-6">
                {tab === "upcoming"
                  ? "You don't have any upcoming appointments"
                  : tab === "past"
                  ? "No past appointments found"
                  : "No cancelled appointments"}
              </p>
              {tab === "upcoming" && (
                <Link href="/appointments">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium shadow-md"
                  >
                    Book Appointment
                  </motion.button>
                </Link>
              )}
            </GlassCard>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {displayList.map((appt) => (
                  <motion.div
                    key={appt.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <GlassCard hover={false} className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                              appt.status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : appt.date < today
                                ? "bg-gray-100 text-gray-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {appt.status === "cancelled"
                              ? "Cancelled"
                              : appt.date < today
                              ? "Completed"
                              : "Upcoming"}
                          </span>
                          <span className="text-xs text-gray-400">
                            #{appt.id}
                          </span>
                        </div>
                        {appt.status === "upcoming" && appt.date >= today && (
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleReschedule(appt)}
                              className="p-1.5 rounded-lg text-accent-dark hover:bg-accent/10 transition-colors"
                              title="Reschedule"
                            >
                              <RefreshCw size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setCancelId(appt.id!)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                              title="Cancel"
                            >
                              <X size={16} />
                            </motion.button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={14} className="text-primary-400" />
                          {appt.patientName}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Stethoscope size={14} className="text-primary-400" />
                          {appt.doctor}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={14} className="text-primary-400" />
                          {appt.date}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={14} className="text-primary-400" />
                          {appt.time}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {appt.appointmentType}
                      </div>
                      {appt.notes && (
                        <p className="mt-2 text-xs text-gray-400 italic">
                          {appt.notes}
                        </p>
                      )}
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelId !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setCancelId(null)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={24} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cancel Appointment?
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCancelId(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50"
                  >
                    Keep It
                  </button>
                  <button
                    onClick={() => handleCancel(cancelId)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
