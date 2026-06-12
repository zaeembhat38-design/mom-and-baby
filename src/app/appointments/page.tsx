"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, LogIn } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import OTPVerification from "@/components/OTPVerification";
import { useAuth } from "@/lib/auth-context";
import {
  createAppointment,
  isNumberVerified,
  isEmailVerified,
  saveVerifiedNumber,
  saveVerifiedEmail,
} from "@/lib/db";
import { validatePhone, validateEmail } from "@/lib/validation";
import { sendPhoneOTP, verifyPhoneOTP, sendEmailOTP, verifyEmailOTP } from "@/lib/verification";
import { DOCTORS, APPOINTMENT_TYPES, TIME_SLOTS } from "@/lib/constants";

export default function AppointmentsPage() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    appointmentType: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // Pre-fill from user
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        patientName: f.patientName || user.fullName,
        phone: f.phone || user.mobile,
        email: f.email || user.email,
      }));
    }
  }, [user]);

  // Check if already verified
  useEffect(() => {
    const checkVerification = async () => {
      if (form.phone && !validatePhone(form.phone)) {
        const verified = await isNumberVerified(form.phone);
        setPhoneVerified(verified);
      }
      if (form.email && !validateEmail(form.email)) {
        const verified = await isEmailVerified(form.email);
        setEmailVerified(verified);
      }
    };
    checkVerification();
  }, [form.phone, form.email]);

  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    const newErrors: Record<string, string> = {};

    if (!form.patientName.trim()) newErrors.patientName = "Patient name required";
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) newErrors.phone = phoneErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    if (!form.appointmentType) newErrors.appointmentType = "Select appointment type";
    if (!form.doctor) newErrors.doctor = "Select a doctor";
    if (!form.date) newErrors.date = "Select a date";
    if (!form.time) newErrors.time = "Select a time";
    if (!phoneVerified) newErrors.phoneVerify = "Phone verification required";
    if (!emailVerified) newErrors.emailVerify = "Email verification required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      await createAppointment({
        userId: user!.id!,
        patientName: form.patientName,
        phone: form.phone,
        email: form.email,
        appointmentType: form.appointmentType,
        doctor: form.doctor,
        date: form.date,
        time: form.time,
        notes: form.notes,
        status: "upcoming",
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
    } catch (err: unknown) {
      setGlobalError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <PageTransition>
        <section className="min-h-screen py-16 md:py-24 relative flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
          <div className="relative max-w-md mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
                <LogIn size={28} className="text-primary-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Login Required
            </h1>
            <p className="text-gray-500 mb-6">
              Please login or create an account to book an appointment
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-xl bg-white text-primary-600 font-semibold border border-primary-200"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  if (success) {
    return (
      <PageTransition>
        <section className="min-h-screen py-16 md:py-24 relative flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
          <div className="relative max-w-md mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Appointment Booked!
              </h1>
              <p className="text-gray-500 mb-2">
                Your appointment has been successfully scheduled.
              </p>
              <div className="bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 p-4 mb-6 text-left space-y-2">
                <p className="text-sm"><span className="text-gray-500">Doctor:</span> <span className="font-medium">{form.doctor}</span></p>
                <p className="text-sm"><span className="text-gray-500">Date:</span> <span className="font-medium">{form.date}</span></p>
                <p className="text-sm"><span className="text-gray-500">Time:</span> <span className="font-medium">{form.time}</span></p>
                <p className="text-sm"><span className="text-gray-500">Type:</span> <span className="font-medium">{form.appointmentType}</span></p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/my-appointments">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg"
                  >
                    View Appointments
                  </motion.button>
                </Link>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-xl bg-white text-primary-600 font-semibold border border-primary-200"
                  >
                    Go Home
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="min-h-screen py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-primary-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Appointment
            </h1>
            <p className="text-gray-500">
              Schedule a visit with our specialists
            </p>
          </div>

          <GlassCard hover={false} className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {globalError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
                  {globalError}
                </div>
              )}

              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={form.patientName}
                  onChange={(e) =>
                    setForm({ ...form, patientName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="Patient full name"
                />
                {errors.patientName && (
                  <p className="text-sm text-red-500 mt-1">{errors.patientName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm({ ...form, phone: val });
                    setPhoneVerified(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
                {!phoneVerified && !validatePhone(form.phone) && (
                  <OTPVerification
                    type="phone"
                    target={form.phone}
                    onVerified={async () => {
                      setPhoneVerified(true);
                      await saveVerifiedNumber(form.phone);
                    }}
                    onSendOTP={() => sendPhoneOTP(form.phone)}
                    onVerifyOTP={(code) => verifyPhoneOTP(form.phone, code)}
                    className="mt-2"
                  />
                )}
                {errors.phoneVerify && !phoneVerified && (
                  <p className="text-sm text-red-500 mt-1">{errors.phoneVerify}</p>
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
                    onVerified={async () => {
                      setEmailVerified(true);
                      await saveVerifiedEmail(form.email);
                    }}
                    onSendOTP={() => sendEmailOTP(form.email)}
                    onVerifyOTP={(code) => verifyEmailOTP(form.email, code)}
                    className="mt-2"
                  />
                )}
                {errors.emailVerify && !emailVerified && (
                  <p className="text-sm text-red-500 mt-1">{errors.emailVerify}</p>
                )}
              </div>

              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Type
                </label>
                <select
                  value={form.appointmentType}
                  onChange={(e) =>
                    setForm({ ...form, appointmentType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none"
                >
                  <option value="">Select type</option>
                  {APPOINTMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.appointmentType && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.appointmentType}
                  </p>
                )}
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <select
                  value={form.doctor}
                  onChange={(e) =>
                    setForm({ ...form, doctor: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none"
                >
                  <option value="">Select doctor</option>
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
                </select>
                {errors.doctor && (
                  <p className="text-sm text-red-500 mt-1">{errors.doctor}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  min={getTodayStr()}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
                {errors.date && (
                  <p className="text-sm text-red-500 mt-1">{errors.date}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none"
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-sm text-red-500 mt-1">{errors.time}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                  placeholder="Any additional information..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-all disabled:opacity-50"
              >
                <Calendar size={18} />
                {submitting ? "Booking..." : "Book Appointment"}
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
