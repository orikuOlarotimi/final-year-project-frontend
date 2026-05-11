import React from "react";

const CTA = () => {
  return (
    <div>
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="opacity-100 transform-none transition-all duration-[750ms] ease-in-out">
          <div className="relative rounded-3xl p-14 md:p-24 text-center overflow-hidden bg-gradient-to-br from-[#4c1d95] via-[#7c3aed] via-[55%] to-[#6d28d9] shadow-[0_40px_100px_rgba(124,58,237,0.45)]">
            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_85%,rgba(245,158,11,0.267)_0%,transparent_40%),radial-gradient(circle_at_85%_15%,rgba(236,72,153,0.267)_0%,transparent_40%)]"
            ></div>
            <div className="relative z-10">
              <h2 className="font-black leading-tight mb-5 font-serif text-[clamp(2rem,5vw,3.75rem)] text-white ">
                Ready to have a real
                <br />
                conversation with your docs?
              </h2>
              <p className="text-base mb-10 max-w-xl mx-auto text-[rgb(221,214,254)]">
                Join 50,000+ professionals who get answers in seconds, not
                hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="text-[rgb(124,58,237)] group flex items-center gap-2 px-10 py-4 rounded-2xl bg-white font-bold text-base transition-all duration-300 hover:bg-violet-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
                  Start Free — No Card Needed
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
                    className="lucide lucide-arrow-right w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <button className="px-10 py-4 rounded-2xl border font-medium text-base transition-all duration-300 hover:bg-white/10 hover:scale-105 border-[rgba(255,255,255,0.3)] text-[rgb(255,255,255)]">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
