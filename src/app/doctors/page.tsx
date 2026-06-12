"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, Clock, Calendar, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { DOCTORS, TIMINGS } from "@/lib/constants";

export default function DoctorsPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <Stethoscope size={28} className="text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-500">Doctors</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our team of experienced specialists dedicated to providing
              the highest quality maternal and child healthcare
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {DOCTORS.map((doctor, index) => (
              <GlassCard key={doctor.id} delay={index * 0.15} className="p-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-200">
                    <span className="text-2xl font-bold text-white">
                      {doctor.avatar}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-1">
                    {doctor.specialization}
                  </p>
                  {doctor.subSpecialization && (
                    <p className="text-sm text-gray-500 mb-4">
                      {doctor.subSpecialization}
                    </p>
                  )}
                  <div className="border-t border-primary-100 pt-4 mt-4">
                    <Link href="/appointments">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-50 text-primary-600 font-medium text-sm hover:bg-primary-100 transition-colors"
                      >
                        <Calendar size={16} />
                        Book Appointment
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timings */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Consultation Timings
            </h2>
            <p className="text-gray-500">
              Visit us during the following hours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Object.values(TIMINGS).map((timing, index) => (
              <GlassCard key={timing.label} delay={index * 0.15} className="p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Clock size={22} className="text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {timing.label}
                </h3>
                <p className="text-primary-600 font-medium">{timing.time}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need a Consultation?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Book an appointment with our specialists today
            </p>
            <Link href="/appointments">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200"
              >
                Book Now
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
