"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const trimmedName = name.trim();

     const trimmedEmail = email.trim().toLowerCase();

     const trimmedPassword = password.trim();

     // Email validation regex
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     // Name validation
     if (!trimmedName) {
       toast.error("Full name is required");
       return;
     }

     if (trimmedName.length < 2) {
       toast.error("Name must be at least 2 characters");
       return;
     }

     // Email validation
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
         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             name: trimmedName,
             email: trimmedEmail,
             password: trimmedPassword,
           }),
         },
       );

       const data = await response.json();

       if (!response.ok) {
         toast.error(data?.detail?.message || "Signup failed");
         return;
       }

       toast.success("OTP sent successfully");

       // Clear form
       setName("");
       setEmail("");
       setPassword("");

       // Redirect to OTP page
       router.push(`/otp?email=${encodeURIComponent(trimmedEmail)}`);
     } catch (error) {
       console.error(error);

       toast.error("Unable to connect to the server");
     } finally {
       setLoading(false);
     }
    // Handle signup logic here
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(9,7,26)] px-6 py-12 flex items-center justify-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/15 blur-[100px]" />

        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-[160px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[length:36px_36px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-violet-600/20 bg-[#120f2ed9] backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(124,58,237,0.15)] transition-all duration-500 hover:border-violet-500/40">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br from-violet-600 to-amber-500 shadow-[0_8px_32px_rgba(124,58,237,0.4)] transition-transform duration-300 hover:scale-110">
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-black mb-2 text-[#eeeaff] font-['Playfair_Display',serif]">
              Create Account
            </h1>

            <p className="text-sm text-[rgb(139,127,196)]">
              Start your journey with DocuMind
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-violet-300">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(139,127,196)]" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-violet-600/25 bg-[rgba(30,27,75,0.4)] text-[#eeeaff] text-sm outline-none transition-all duration-300 placeholder:text-[rgb(139,127,196)] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-violet-300">
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-violet-600/25 bg-[rgba(30,27,75,0.4)] text-[#eeeaff] text-sm outline-none transition-all duration-300 placeholder:text-[rgb(139,127,196)] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-violet-300">
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
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-violet-600/25 bg-[rgba(30,27,75,0.4)] text-[#eeeaff] text-sm outline-none transition-all duration-300 placeholder:text-[rgb(139,127,196)] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(139,127,196)] hover:text-violet-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-[rgb(139,127,196)]">
                Must be at least 8 characters with a mix of letters and numbers
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-600/15" />
            </div>

            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#120f2e] text-[rgb(139,127,196)]">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block w-full rounded-xl border border-violet-600/30 py-3.5 text-center text-sm font-bold text-violet-300 transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/5"
          >
            Sign In Instead
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[rgb(139,127,196)]">
          By creating an account, you agree to DocuMind&apos;s{" "}
          <Link
            href="/terms"
            className="underline transition-colors hover:text-violet-400"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline transition-colors hover:text-violet-400"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
