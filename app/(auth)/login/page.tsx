"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../src/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!trimmedPassword) {
      toast.error("Password is required");
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail.toLowerCase(),
            password: trimmedPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "Login failed");
        return;
      }

      login({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      localStorage.setItem("status", data.status);
      toast.success("Login successful");
      setEmail("");
      setPassword("");
      console.log(data);

      // router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-12 font-['Plus_Jakarta_Sans'] bg-[rgb(9,7,26)]">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-[0.18] blur-[120px] bg-[rgb(124,58,237)]"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px] bg-[rgb(245,158,11)]"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.04] blur-[160px] bg-[rgb(236,72,153)]"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[length:36px_36px]"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-violet-600/20 bg-[#120f2ed9] backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(124,58,237,0.15)] transition-all duration-500 hover:border-violet-500/40">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-[linear-gradient(135deg,#7c3aed_0%,#ec4899_100%)] shadow-[0_8px_32px_rgba(124,58,237,0.4)] transition-all duration-300 hover:scale-110">
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-black mb-2 font-['Playfair_Display'] text-[#eeeaff]">
              Welcome Back
            </h1>

            <p className="text-sm text-[rgb(139,127,196)]">
              Sign in to continue to DocuMind
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-[rgb(196,181,253)]">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(139,127,196)]" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-violet-600/25 bg-[rgba(30,27,75,0.4)] text-[#eeeaff] text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-[rgb(196,181,253)]">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(139,127,196)]" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-violet-600/25 bg-[rgba(30,27,75,0.4)] text-[#eeeaff] text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(139,127,196)] hover:text-[rgb(196,181,253)] transition-colors duration-200 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#7c3aed_0%,#ec4899_100%)] text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-600/15"></div>
            </div>

            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#120f2ed9] text-[rgb(139,127,196)]">
                Don&apos;t have an account?
              </span>
            </div>
          </div>

          {/* Signup */}
          <Link
            href="/signup"
            className="block w-full py-3.5 rounded-xl font-bold text-sm text-center border border-violet-600/30 text-[rgb(196,181,253)] transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/5"
          >
            Create New Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6 text-[rgb(139,127,196)]">
          By continuing, you agree to DocuMind&apos;s{" "}
          <Link
            href="/terms"
            className="underline hover:text-violet-400 transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-violet-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
