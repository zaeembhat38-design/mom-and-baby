"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, Home as HomeIcon, Phone, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { LAB_TESTS, CLINIC } from "@/lib/constants";

export default function LaboratoryPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-primary-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <FlaskConical size={28} className="text-accent-dark" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Diagnostic <span className="text-accent-dark">Laboratory</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive diagnostic testing with accurate results. We offer a
              wide range of laboratory tests for complete health assessment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Home Sample Collection Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard hover={false} className="bg-gradient-to-r from-accent/10 to-primary-50 p-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                <HomeIcon size={22} className="text-accent-dark" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">
                  Home Sample Collection Available
                </h3>
                <p className="text-sm text-gray-600">
                  Blood sample pickup from your home for your convenience
                </p>
              </div>
              <a href={`tel:${CLINIC.phone}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium shadow-md"
                >
                  <Phone size={14} />
                  Call to Book
                </motion.button>
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Tests */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Available Tests
            </h2>
            <p className="text-gray-500">
              Comprehensive range of diagnostic tests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAB_TESTS.map((test, index) => (
              <GlassCard key={test.name} delay={index * 0.05} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary-100 flex items-center justify-center flex-shrink-0">
                    <FlaskConical size={18} className="text-accent-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{test.name}</h3>
                    <p className="text-sm text-gray-500">{test.description}</p>
                  </div>
                </div>
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
              Need a Lab Test?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Book an appointment or call us to schedule your lab tests
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/appointments">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg"
                >
                  Book Appointment <ArrowRight size={16} />
                </motion.button>
              </Link>
              <a href={`tel:${CLINIC.phone}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-primary-600 font-semibold border border-primary-200 shadow-sm"
                >
                  <Phone size={16} /> Call Us
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
