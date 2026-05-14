"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "../../../src/context/AuthContext";

export default function EnterOTP() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = searchParams.get("email");
    const otpValue = otp.join("").trim();

    if (!email) {
      toast.error("Email is missing. Please signup again.");
      return;
    }

    // Check if OTP is empty
    if (!otpValue) {
      toast.error("Please enter the OTP code");
      return;
    }

    // Ensure OTP contains only numbers
    if (!/^\d+$/.test(otpValue)) {
      toast.error("OTP must contain only numbers");
      return;
    }
    if (otp.some((digit) => !digit)) {
      toast.error("Please enter the complete OTP");
      return;
    }

    if (otpValue.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otpValue,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "OTP verification failed");
        return;
      }

      // Save tokens + update global auth state
      login({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });

      // Optional verification status
      localStorage.setItem("status", data.status);

      toast.success("Account verified successfully");

      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);

      // Redirect to dashboard
       router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
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

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[rgb(9,7,26)] px-6 py-12 flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] ">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-[0.18] blur-[120px] bg-violet-600 " />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px] bg-amber-500" />

        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[160px] bg-pink-500" />
      </div>

      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[length:36px_36px]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-violet-500/20 bg-[rgba(18,15,46,0.85)] backdrop-blur-xl p-8 transition-all duration-500 hover:border-violet-500/40 shadow-[0_20px_60px_rgba(124,58,237,0.15)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all duration-300 hover:scale-110 bg-gradient-to-br from-pink-500 to-amber-500 shadow-[0_8px_32px_rgba(236,72,153,0.4)]">
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            <h1 className="text-3xl font-black mb-2 text-[rgb(238,234,255)] font-['Playfair_Display',serif]">
              Verify Your Email
            </h1>

            <p className="text-sm text-[rgb(139,127,196)]">
              Enter the 6-digit code we sent to
            </p>

            <p className="mt-1 text-sm font-semibold text-violet-300">
              you@example.com
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between gap-3"
          >
            {/* OTP Inputs */}
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

            {/* Timer / Resend */}
            <div className="text-center">
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isComplete}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed
                ${
                  isComplete
                    ? "bg-gradient-to-r from-pink-500 to-amber-500 shadow-[0_8px_32px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.5)]"
                    : "bg-violet-500/20"
                }
              `}
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="text-sm font-semibold text-[rgb(139,127,196)] transition-colors hover:text-violet-300"
            >
              Change email address
            </Link>
          </div>
        </div>

        {/* Help */}
        <p className="mt-6 text-center text-xs text-[rgb(139,127,196)]">
          Having trouble?{" "}
          <Link
            href="/"
            className="underline transition-colors hover:text-violet-400"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
