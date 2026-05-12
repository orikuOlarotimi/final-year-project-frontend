"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(60);


  const hasMinLength = password.length >= 8;

  const hasLetterAndNumber =
    /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  

    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }, [timer]);
  
    const handleChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
  
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
  
      setOtp(newOtp);
  
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };
  
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
  
      const pastedData = e.clipboardData.getData("text").slice(0, 6);
  
      if (!/^\d+$/.test(pastedData)) return;
  
      const newOtp = pastedData
        .split("")
        .concat(Array(6 - pastedData.length).fill(""));
  
      setOtp(newOtp);
  
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };
    
    const handleResend = async () => {
      const email = searchParams.get("email");

      // Ensure email exists
      if (!email) {
        toast.error("Email is missing. Please signup again.");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim().toLowerCase())) {
        toast.error("Invalid email address");
        return;
      }

      try {
        setResending(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.trim().toLowerCase(),
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data?.detail?.message || "Failed to resend OTP");
          return;
        }

        toast.success("OTP resent successfully");

        // Reset timer
        setTimer(60);

        // Clear OTP inputs
        setOtp(["", "", "", "", "", ""]);

        // Focus first input
        inputRefs.current[0]?.focus();
      } catch (error) {
        console.error(error);

        toast.error("Unable to connect to the server");
      } finally {
        setResending(false);
      }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = searchParams.get("email");

    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const otpValue = otp.join("").trim();

    // Email validation
    if (!email) {
      toast.error("Email is missing");
      return;
    }

    // OTP validation
    if (!otpValue) {
      toast.error("OTP is required");
      return;
    }

    if (otpValue.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    if (!/^\d+$/.test(otpValue)) {
      toast.error("OTP must contain only numbers");
      return;
    }
    // Password validation
    if (!trimmedPassword) {
      toast.error("New password is required");
      return;
    }

    if (!trimmedConfirmPassword) {
      toast.error("Confirm password is required");
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Password strength check
    const hasLetter = /[a-zA-Z]/.test(trimmedPassword);
    const hasNumber = /[0-9]/.test(trimmedPassword);

    if (!hasLetter || !hasNumber) {
      toast.error("Password must contain letters and numbers");
      return;
    }

    // Password match check
    if (trimmedPassword !== trimmedConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otpValue,
            new_password: trimmedPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "Failed to reset password");
        return;
      }

      toast.success("Password reset successful");

      // Clear fields after success only
      setPassword("");
      setConfirmPassword("");
      setOtp(["", "", "", "", "", ""]);

      router.push("/login");
    } catch (error) {
      console.error(error);

      toast.error("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-[0_8px_32px_rgba(16,185,129,0.4)] transition-transform duration-300 hover:scale-110">
              <Lock className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-black mb-2 text-[#eeeaff] font-['Playfair_Display',serif]">
              Create New Password
            </h1>

            <p className="text-sm text-[rgb(139,127,196)]">
              Enter a strong password for your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password */}
            <div className="flex flex-wrap justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-11 h-12 sm:w-12 sm:h-14 md:h-[45px] rounded-xl border text-center text-xl font-bold outline-none transition-all duration-300 focus:scale-105 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)]
                    ${digit ? "border-pink-500/50" : "border-violet-500/25"}
                    bg-[rgba(30,27,75,0.4)] text-[rgb(238,234,255)]
                  `}
                />
              ))}
            </div>

            <div className="text-end">
              {timer > 0 ? (
                <p className="text-sm text-[rgb(139,127,196)]">
                  Resend code in{" "}
                  <span className="font-semibold text-violet-300">
                    {timer}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-pink-500 transition-all duration-200 hover:text-pink-400 disabled:opacity-60"
                >
                  {resending ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      Resend Code
                    </>
                  )}
                </button>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2 text-violet-300">
                New Password
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
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold mb-2 text-violet-300">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(139,127,196)]" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-violet-600/25 bg-[rgba(30,27,75,0.4)] text-[#eeeaff] text-sm outline-none transition-all duration-300 placeholder:text-[rgb(139,127,196)] focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(139,127,196)] hover:text-violet-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2 rounded-xl bg-[rgba(30,27,75,0.3)] p-4">
              <p className="mb-2 text-xs font-semibold text-violet-300">
                Password must contain:
              </p>

              <div className="flex items-center gap-2 text-xs">
                <CheckCircle
                  className={`w-3.5 h-3.5 transition-colors ${
                    hasMinLength ? "text-green-400" : "text-gray-600"
                  }`}
                />

                <span
                  className={
                    hasMinLength ? "text-green-400" : "text-[rgb(139,127,196)]"
                  }
                >
                  At least 8 characters
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <CheckCircle
                  className={`w-3.5 h-3.5 transition-colors ${
                    hasLetterAndNumber ? "text-green-400" : "text-gray-600"
                  }`}
                />

                <span
                  className={
                    hasLetterAndNumber
                      ? "text-green-400"
                      : "text-[rgb(139,127,196)]"
                  }
                >
                  Letters and numbers
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <CheckCircle
                  className={`w-3.5 h-3.5 transition-colors ${
                    passwordsMatch ? "text-green-400" : "text-gray-600"
                  }`}
                />

                <span
                  className={
                    passwordsMatch
                      ? "text-green-400"
                      : "text-[rgb(139,127,196)]"
                  }
                >
                  Passwords match
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={
                loading ||
                !hasMinLength ||
                !hasLetterAndNumber ||
                !passwordsMatch
              }
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_8px_32px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(16,185,129,0.5)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-[rgb(139,127,196)] transition-colors hover:text-violet-300"
            >
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
