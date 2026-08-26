"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, Mail, User, Lock, Key } from "lucide-react";
import { Container } from "@/components/ui/shared";

export default function ClientProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setFormData({
          name: data.user.name,
          email: data.user.email,
        });
      } else {
        router.push("/client/login");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch("/api/client/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/client/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (res.ok) {
        setSuccess("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to change password");
      }
    } catch (err) {
      setError("Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-cream pt-24 pb-16">
        <Container>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-ink-600">Loading profile...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream pt-24 pb-16">
      <Container>
        <div className="mb-6">
          <Link
            href="/client/dashboard"
            className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-accent-600"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="font-display text-4xl text-primary-900 mb-8">Profile Settings</h1>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-2xl mb-6">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-700 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl text-primary-900">Profile Information</h2>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                  />
                </div>
              </div>

              {user?.clientId && (
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Client ID
                  </label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                    <input
                      type="text"
                      value={user.clientId}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 bg-primary-50 text-ink-600 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-ink-500 mt-1">
                    This is your unique identifier. Keep it safe.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-primary-700 text-white font-bold hover:bg-primary-800 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-600 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl text-primary-900">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <p className="text-xs text-ink-500 mt-1">Minimum 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-accent-600 text-white font-bold hover:bg-accent-700 transition-all disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                {saving ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
