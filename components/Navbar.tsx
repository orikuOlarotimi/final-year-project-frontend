import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" absolute top-0 w-full z-99">
      <div
        className="container mx-auto px-6 flex items-center justify-between z-50 "
        style={{ padding: "10px" }}
      >
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[rgb(124,58,237)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_16px_#7c3aed88]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sparkles w-4 h-4 text-white"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
          </div>
          <span className="font-black text-lg text-[#eeeaff] tracking-tight ">
            DocuMind
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 ml-19">
          <button className="relative text-sm font-medium group text-[rgb(139,127,196)] cursor-pointer">
            Features
            <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[rgb(124,58,237)] rounded-full"></span>
          </button>
          <button className="relative text-sm font-medium group text-[rgb(139,127,196)] cursor-pointer">
            How It Works
            <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[rgb(124,58,237)] rounded-full"></span>
          </button>
          <button className="relative text-sm font-medium group text-[rgb(139,127,196)] cursor-pointer">
            Terms
            <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[rgb(124,58,237)] rounded-full"></span>
          </button>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[rgb(139,127,196)] font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5 hover:text-[#eeeaff] cursor-pointer"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="text-sm font-bold px-5 py-2.5 rounded-xl bg-[rgb(124,58,237)] text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_24px_#7c3aed88] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Sign Up Free
          </Link>
        </div>
        <button className="md:hidden bg-[rgb(238,234,255)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu w-5 h-5"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
