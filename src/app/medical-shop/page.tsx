"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Baby,
  Leaf,
  Shield,
  Plus,
  Phone,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { SHOP_CATEGORIES, CLINIC } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Baby,
  Leaf,
  Shield,
  Plus,
};

const colorMap: Record<string, string> = {
  Heart: "from-pink-500 to-rose-400",
  Baby: "from-blue-500 to-cyan-400",
  Leaf: "from-emerald-500 to-teal-400",
  Shield: "from-purple-500 to-violet-400",
  Plus: "from-amber-500 to-orange-400",
};

export default function MedicalShopPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-background to-primary-50" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={28} className="text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Prime <span className="text-purple-500">Medical Shop</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your one-stop destination for all mother and baby healthcare
              essentials. Quality products from trusted brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Product Categories
            </h2>
            <p className="text-gray-500">
              Everything you need for mother and baby care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOP_CATEGORIES.map((category, index) => {
              const Icon = iconMap[category.icon] || ShoppingBag;
              const gradient = colorMap[category.icon] || "from-gray-500 to-gray-400";
              return (
                <GlassCard key={category.name} delay={index * 0.1} className="p-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard
            hover={false}
            className="bg-gradient-to-br from-purple-500 to-primary-600 p-8 md:p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Visit Our Medical Shop
            </h2>
            <p className="text-purple-100 mb-8 max-w-lg mx-auto">
              Located inside MOM & BABY Polyclinic. Walk in or call for inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${CLINIC.phone}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-purple-600 font-semibold shadow-lg"
                >
                  <Phone size={16} /> Call Us
                </motion.button>
              </a>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30"
                >
                  Get Directions
                </motion.button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
