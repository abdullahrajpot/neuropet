"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Key, Eye, EyeOff } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { motion } from "framer-motion";

export default function ClientRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    clientId: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "client",
          clientId: formData.clientId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Auto-login after successful registration
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: "client",
        }),
      });

      if (loginRes.ok) {
        router.push("/client/dashboard");
        router.refresh();
      } else {
        router.push("/client/login");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 via-cream to-primary-100 flex items-center justify-center py-12 px-4">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-700 mb-4">
              <UserPlus className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="font-display text-3xl text-primary-900 mb-2">Create Your Account</h1>
            <p className="text-ink-600">Register to access your behaviour assessment</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

              <div className="bg-accent-50 border-2 border-accent-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Key className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-accent-900 mb-1">Need your Client ID?</p>
                    <p className="text-xs text-accent-700">
                      You received this ID in your confirmation email after submitting your assessment form.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="clientId" className="block text-sm font-semibold text-primary-900 mb-2">
                  Client ID *
                </label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    id="clientId"
                    name="clientId"
                    type="text"
                    required
                    value={formData.clientId}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="Enter your Client ID"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="John Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-primary-900 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-primary-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-ink-500 mt-1">Minimum 8 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary-900 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-full bg-primary-700 text-white font-bold text-lg hover:bg-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-primary-100">
              <p className="text-center text-sm text-ink-600">
                Already have an account?{" "}
                <Link
                  href="/client/login"
                  className="text-primary-700 font-semibold hover:text-accent-600 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-primary-700 hover:text-accent-600 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
