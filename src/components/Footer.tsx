"use client";

import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { CLINIC, TIMINGS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-xl p-1.5">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-white">MOM & BABY</h3>
                <p className="text-xs text-primary-200">Polyclinic Handwara</p>
              </div>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed">
              Premium maternity and childcare healthcare services in Handwara, Kashmir.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/doctors", label: "Our Doctors" },
                { href: "/laboratory", label: "Laboratory" },
                { href: "/medical-shop", label: "Medical Shop" },
                { href: "/appointments", label: "Book Appointment" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-primary-200 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary-300 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary-200">{CLINIC.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-300 flex-shrink-0" />
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="text-sm text-primary-200 hover:text-white transition-colors"
                >
                  {CLINIC.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Timings */}
          <div>
            <h4 className="font-semibold text-white mb-4">Timings</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary-300">{TIMINGS.morning.label}</p>
                  <p className="text-sm text-primary-200">{TIMINGS.morning.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary-300">{TIMINGS.evening.label}</p>
                  <p className="text-sm text-primary-200">{TIMINGS.evening.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-primary-300 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary-300">{TIMINGS.sunday.label}</p>
                  <p className="text-sm text-primary-200">{TIMINGS.sunday.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6">
          <p className="text-center text-sm text-primary-300">
            © {new Date().getFullYear()} MOM & BABY Polyclinic Handwara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
