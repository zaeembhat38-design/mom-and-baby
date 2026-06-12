"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  ShoppingBag,
  Calendar,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { CLINIC, TIMINGS } from "@/lib/constants";

const services = [
  {
    title: "Doctors",
    description: "Expert Gynecologists & Pediatricians",
    icon: Users,
    href: "/doctors",
    color: "from-pink-500 to-rose-400",
  },
  {
    title: "Laboratory",
    description: "Comprehensive diagnostic testing",
    icon: FlaskConical,
    href: "/laboratory",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Prime Medical Shop",
    description: "Mother & baby care essentials",
    icon: ShoppingBag,
    href: "/medical-shop",
    color: "from-purple-500 to-violet-400",
  },
  {
    title: "Appointments",
    description: "Book your visit online",
    icon: Calendar,
    href: "/appointments",
    color: "from-emerald-500 to-teal-400",
  },
  {
    title: "Contact",
    description: "Get in touch with us",
    icon: Phone,
    href: "/contact",
    color: "from-amber-500 to-orange-400",
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200/50 shadow-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600 font-medium">
                  Now accepting appointments
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Caring for </span>
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Mom & Baby
                </span>
                <br />
                <span className="text-gray-900">with Love</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Premium maternity and childcare healthcare services in Handwara.
                Expert gynecologists, pediatricians, modern laboratory, and
                comprehensive medical shop — all under one roof.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/appointments">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-shadow"
                  >
                    <Calendar size={18} />
                    Book Appointment
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
                <Link href="/doctors">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/70 backdrop-blur-sm text-primary-600 font-semibold border border-primary-200 hover:bg-white transition-all"
                  >
                    <Users size={18} />
                    Our Doctors
                  </motion.button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={14} className="text-primary-400" />
                  Handwara, Kashmir
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={14} className="text-primary-400" />
                  {CLINIC.phone}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300/30 to-accent/20 rounded-full blur-3xl scale-110" />
                <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 w-96 h-96 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="MOM & BABY Polyclinic"
                    width={280}
                    height={280}
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to{" "}
              <span className="text-primary-500">MOM & BABY</span> Polyclinic
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At MOM & BABY Polyclinic Handwara, we provide exceptional
              healthcare services for mothers and children. Our dedicated team of
              specialists ensures the best care for you and your little ones in a
              warm, welcoming environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Comprehensive healthcare services for mothers and children
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.href} href={service.href}>
                  <GlassCard delay={index * 0.1} className="p-6 h-full cursor-pointer group">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary-500 font-medium group-hover:gap-2 transition-all">
                      Learn more <ChevronRight size={14} />
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
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
              Clinic Timings
            </h2>
            <p className="text-gray-500">We are available at the following hours</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard
            hover={false}
            className="bg-gradient-to-br from-primary-500 to-primary-600 p-8 md:p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Book Your Visit?
            </h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              Schedule an appointment with our expert doctors today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/appointments">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 rounded-2xl bg-white text-primary-600 font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Book Appointment
                </motion.button>
              </Link>
              <a href={`tel:${CLINIC.phone}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3.5 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all"
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Phone size={16} /> Call Now
                  </span>
                </motion.button>
              </a>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
