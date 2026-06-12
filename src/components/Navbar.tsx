"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Users,
  FlaskConical,
  ShoppingBag,
  Calendar,
  Phone,
  Info,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/doctors", label: "Doctors", icon: Users },
  { href: "/laboratory", label: "Laboratory", icon: FlaskConical },
  { href: "/medical-shop", label: "Medical Shop", icon: ShoppingBag },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Logo size={36} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className={clsx(
                      "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                      pathname === "/profile"
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                    )}
                  >
                    <User size={16} />
                    {user.fullName.split(" ")[0]}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-all shadow-md shadow-primary-200"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl z-50 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-primary-100">
                  <Logo size={32} />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-3">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-all",
                          pathname === link.href
                            ? "bg-primary-100 text-primary-700"
                            : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                        )}
                      >
                        <Icon size={18} />
                        {link.label}
                      </Link>
                    );
                  })}

                  <div className="border-t border-primary-100 my-3" />

                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-all",
                          pathname === "/profile"
                            ? "bg-primary-100 text-primary-700"
                            : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                        )}
                      >
                        <User size={18} />
                        My Profile
                      </Link>
                      <Link
                        href="/my-appointments"
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-all",
                          pathname === "/my-appointments"
                            ? "bg-primary-100 text-primary-700"
                            : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                        )}
                      >
                        <Calendar size={18} />
                        My Appointments
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary-600 hover:bg-primary-50 mb-1 transition-all"
                      >
                        <LogIn size={18} />
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 mx-2 py-3 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-all"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>

                <div className="p-4 border-t border-primary-100">
                  <p className="text-xs text-gray-400 text-center">
                    MOM & BABY Polyclinic Handwara
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
