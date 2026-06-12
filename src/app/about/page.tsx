"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Calendar, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { CLINIC, TIMINGS } from "@/lib/constants";

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                About{" "}
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  MOM & BABY
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                MOM & BABY Polyclinic Handwara is a premier healthcare facility
                dedicated to providing comprehensive maternity and childcare
                services. Located in the heart of Handwara, we combine expert
                medical care with a warm, compassionate approach.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our polyclinic offers specialized gynecology and obstetrics
                services, expert pediatric and neonatal care, a fully-equipped
                diagnostic laboratory, and a well-stocked medical shop catering
                to all mother and baby healthcare needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 to-accent/20 rounded-3xl blur-2xl scale-110" />
                <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8">
                  <Image
                    src="/logo.png"
                    alt="MOM & BABY Polyclinic"
                    width={240}
                    height={240}
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard delay={0} className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center mb-4">
                <MapPin size={22} className="text-primary-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Our Location</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {CLINIC.address}
              </p>
            </GlassCard>

            <GlassCard delay={0.1} className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <Phone size={22} className="text-accent-dark" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600">
                Phone:{" "}
                <a href={`tel:${CLINIC.phone}`} className="text-primary-500">
                  {CLINIC.phone}
                </a>
              </p>
            </GlassCard>

            <GlassCard delay={0.2} className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                <Clock size={22} className="text-emerald-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Timings</h3>
              <div className="space-y-1">
                {Object.values(TIMINGS).map((t) => (
                  <p key={t.label} className="text-sm text-gray-600">
                    <span className="font-medium">{t.label}:</span> {t.time}
                  </p>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                To provide accessible, high-quality maternal and child healthcare
                to the families of Handwara and surrounding areas. We believe
                every mother and child deserves the best medical attention in a
                safe, comfortable environment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With experienced specialists, modern diagnostic facilities, and a
                patient-first approach, we strive to be the most trusted
                healthcare partner for mothers and babies in the region.
              </p>
              <Link href="/appointments">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-shadow"
                >
                  <Calendar size={18} />
                  Book an Appointment
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
