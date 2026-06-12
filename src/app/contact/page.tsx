"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  MessageCircle,
  Send,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { CLINIC } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage as we have no backend
    const messages = JSON.parse(localStorage.getItem("contact_messages") || "[]");
    messages.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem("contact_messages", JSON.stringify(messages));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-blue-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <Phone size={28} className="text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact <span className="text-primary-500">Us</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with us. We&apos;re here to help with all your healthcare needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <GlassCard delay={0} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a
                      href={`tel:${CLINIC.phone}`}
                      className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
                    >
                      {CLINIC.phone}
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.1} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={22} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href={`https://wa.me/${CLINIC.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 font-medium hover:text-green-600 transition-colors"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.2} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-accent-dark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-sm text-gray-600 mb-3">{CLINIC.address}</p>
                    <a
                      href={CLINIC.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium shadow-md hover:bg-accent-dark transition-colors"
                      >
                        <ExternalLink size={14} />
                        Open in Google Maps
                      </motion.button>
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <GlassCard delay={0.3} hover={false} className="p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white/70 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl transition-shadow"
                    >
                      <Send size={16} />
                      Send Message
                    </motion.button>
                  </form>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
