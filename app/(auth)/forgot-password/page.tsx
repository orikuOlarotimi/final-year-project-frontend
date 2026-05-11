"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     const trimmedEmail = email.trim().toLowerCase();

     // Email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     // Empty email check
     if (!trimmedEmail) {
       toast.error("Email is required");
       return;
     }

     // Invalid email syntax check
     if (!emailRegex.test(trimmedEmail)) {
       toast.error("Please enter a valid email address");
       return;
     }

     try {
       setLoading(true);

       const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email: trimmedEmail,
           }),
         },
       );

       const data = await response.json();

       if (!response.ok) {
         toast.error(data?.detail?.message || "Failed to send reset email");
         return;
       }

       toast.success("Password reset OTP sent successfully");

       // Clear form
       setEmail("");
       router.push(`/reset-password?email=${trimmedEmail}`);
       // Show success state
       setSent(true);
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

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[length:36px_36px]"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-violet-600/20 bg-[#120f2ed9] backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(124,58,237,0.15)] transition-all duration-500 hover:border-violet-500/40">
          {!sent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-[linear-gradient(135deg,#7c3aed_0%,#06b6d4_100%)] shadow-[0_8px_32px_rgba(124,58,237,0.4)] transition-all duration-300 hover:scale-110">
                  <Mail className="w-7 h-7 text-white" />
                </div>

                <h1 className="text-3xl font-black mb-2 font-['Playfair_Display'] text-[#eeeaff]">
                  Reset Password
                </h1>

                <p className="text-sm text-[rgb(139,127,196)]">
                  Enter your email and we&apos;ll send you a reset link
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#7c3aed_0%,#06b6d4_100%)] text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-[linear-gradient(135deg,#10b981_0%,#06b6d4_100%)] shadow-[0_8px_32px_rgba(16,185,129,0.4)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-black mb-3 font-['Playfair_Display'] text-[#eeeaff]">
                Check Your Email
              </h2>

              <p className="text-sm mb-6 text-[rgb(139,127,196)]">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-semibold text-[rgb(196,181,253)]">
                  {email}
                </span>
              </p>

              <p className="text-xs mb-8 text-[rgb(139,127,196)]">
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="font-semibold underline text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                >
                  try again
                </button>
              </p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          )}

          {!sent && (
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(139,127,196)] hover:text-[rgb(196,181,253)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
