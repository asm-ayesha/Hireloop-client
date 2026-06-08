"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient, signUp } from "@/lib/auth-client";

// Gravity Icons — inline SVG
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const LoaderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.password) return "Password is required.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error: authError } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (authError) {
        setError(authError.message || "Something went wrong. Please try again.");
      } else {
        setSuccess("Account created successfully! Redirecting to sign in...");
        setForm({ name: "", email: "", password: "" });
        setTimeout(() => {
          window.location.href = "/auth/signin";
        }, 2000);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#3b82f6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#f97316]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Back to sign in */}
        <Link
          href={'/auth/signin'}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200 mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">
            <ArrowLeftIcon />
          </span>
          Back to Sign In
        </Link>

        {/* Card */}
        <div className="bg-white/3 border border-white/8 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">

          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-1 mb-6">
              <span className="text-xl font-bold tracking-tight flex items-center">
                <span className="text-[#3b82f6]">hir</span>
                <span className="text-[#3b82f6]">e</span>
                <span className="text-[#f97316]">l</span>
                <svg width="32" height="22" viewBox="0 0 38 28" className="inline-block" style={{ verticalAlign: "middle" }}>
                  <ellipse cx="13" cy="14" rx="10" ry="8" fill="#f97316" />
                  <ellipse cx="25" cy="14" rx="10" ry="8" fill="#3b82f6" />
                  <ellipse cx="19" cy="14" rx="3.5" ry="8" fill="#0a0a0f" opacity="0.5" />
                  <circle cx="9" cy="10" r="2" fill="white" />
                  <circle cx="29" cy="18" r="2" fill="white" />
                </svg>
                <span className="text-[#f97316]">p</span>
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white leading-tight">
              Create your account
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Start your AI-powered career journey today.
            </p>
          </div>

          {/* Success message */}
          {success && (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-6">
              <CheckCircleIcon />
              <span>{success}</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
              <AlertCircleIcon />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full bg-white/4 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full bg-white/4 border border-white/8 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/4 border border-white/8 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#3b82f6]/60 focus:bg-white/6 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {/* Password strength hint */}
              {/* {form.password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        form.password.length >= level * 2
                          ? level <= 1
                            ? "bg-red-500"
                            : level <= 2
                            ? "bg-orange-500"
                            : level <= 3
                            ? "bg-yellow-500"
                            : "bg-emerald-500"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-white/30 ml-1">
                    {form.password.length < 4
                      ? "Weak"
                      : form.password.length < 6
                      ? "Fair"
                      : form.password.length < 8
                      ? "Good"
                      : "Strong"}
                  </span>
                </div>
              )} */}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#3b82f6]/20"
            >
              {loading ? (
                <>
                  <LoaderIcon />
                  Sign Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm text-white/30 mt-6">
            Already have an account?{" "}
            <Link
              href={'/auth/signin'}
              className="text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}