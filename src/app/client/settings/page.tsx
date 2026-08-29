"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface UserData {
  name: string;
  email: string;
  clientId?: string;
}

export default function ClientSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
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

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary-900 mb-2">Account Settings</h1>
        <p className="text-ink-600">Manage your account information and security</p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-2xl">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-2xl">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <PersonIcon sx={{ fontSize: 32, color: '#1E4A40' }} />
            <h3 className="font-display text-xl text-primary-900">Personal Information</h3>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <PersonIcon sx={{ 
                  fontSize: 20, 
                  color: '#9CA3AF',
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EmailIcon sx={{ 
                  fontSize: 20, 
                  color: '#9CA3AF',
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                />
              </div>
            </div>

            {user?.clientId && (
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Client ID
                </label>
                <div className="relative">
                  <VpnKeyIcon sx={{ 
                    fontSize: 20, 
                    color: '#9CA3AF',
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }} />
                  <input
                    type="text"
                    value={user.clientId}
                    disabled
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 bg-gray-50 text-ink-600 cursor-not-allowed"
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
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-all disabled:opacity-50"
            >
              <SaveIcon sx={{ fontSize: 18 }} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border-2 border-primary-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <LockIcon sx={{ fontSize: 32, color: '#D97540' }} />
            <h3 className="font-display text-xl text-primary-900">Change Password</h3>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Current Password
              </label>
              <div className="relative">
                <LockIcon sx={{ 
                  fontSize: 20, 
                  color: '#9CA3AF',
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                New Password
              </label>
              <div className="relative">
                <LockIcon sx={{ 
                  fontSize: 20, 
                  color: '#9CA3AF',
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
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
                <LockIcon sx={{ 
                  fontSize: 20, 
                  color: '#9CA3AF',
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-accent-600 text-white font-semibold hover:bg-accent-700 transition-all disabled:opacity-50"
            >
              <LockIcon sx={{ fontSize: 18 }} />
              {saving ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
