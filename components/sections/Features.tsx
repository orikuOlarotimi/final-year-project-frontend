import React from "react";

const Features = () => {
  return (
      <section
        className="py-32 relative overflow-hidden bg-gradient-to-b from-[#09071a] via-[#130d35] to-[#09071a] w-full"
      >
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgb(124,58,237)_1px,transparent_1px),linear-gradient(90deg,rgb(124,58,237)_1px,transparent_1px)] bg-[size:56px_56px]"></div>
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-20 opacity-100 transform-none transition-all duration-[750ms] ease-in-out">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6 border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.1)] text-[rgb(252,211,77)]">
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
                className="lucide lucide-book-open w-3.5 h-3.5"
              >
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>{" "}
              How It Works
            </div>
            <h2 className="font-black leading-tight font-['Playfair_Display',_serif] text-[clamp(2.2rem,5vw,3.75rem)] text-[#eeeaff]">
              Three steps to total
              <br />
              <span className="text-[rgb(245,158,11)]">document mastery.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-violet-600/50 to-transparent"></div>
            <div className="opacity-100 transform-none transition-all duration-[750ms] ease-in-out">
              <div className="group text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl border-2 border-[rgba(124,58,237,0.4)] bg-[rgba(124,58,237,0.12)] text-[rgb(196,181,253)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_#7c3aed55]">
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
                    className="lucide lucide-upload w-5 h-5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                </div>
                <div className="font-mono text-xs tracking-widest mb-2 text-[rgb(124,58,237)] font-['DM_Mono',_monospace]">
                  STEP 01
                </div>
                <h3 className="font-bold text-base mb-3 text-[rgb(238,234,255)]">
                  Upload Your File
                </h3>
                <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                  Drag and drop a PDF, DOCX, or TXT — we parse every page in
                  seconds.
                </p>
              </div>
            </div>
            <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[120ms] ease-in-out">
              <div className="group text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl border-2 border-[rgba(124,58,237,0.4)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_#7c3aed55] text-[rgb(196,181,253)] bg-[rgba(124,58,237,0.12)] ">
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
                    className="lucide lucide-brain w-5 h-5"
                  >
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                    <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                    <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                    <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                  </svg>
                </div>
                <div className="font-mono text-xs tracking-widest mb-2 text-[rgb(124,58,237)] font-['DM_Mono',_monospace]">
                  STEP 02
                </div>
                <h3 className="font-bold text-base mb-3 text-[rgb(238,234,255)]">
                  AI Indexes It
                </h3>
                <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                  Our engine embeds, indexes, and builds a semantic map of your
                  document.
                </p>
              </div>
            </div>
            <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[240ms] ease-in-out">
              <div className="group text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl border-2 border-[rgba(124,58,237,0.4)] bg-[rgba(124,58,237,0.12)] text-[rgb(196,181,253)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_#7c3aed55]">
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
                    className="lucide lucide-message-square w-5 h-5"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="font-mono text-xs tracking-widest mb-2 font-['DM_Mono',_monospace] text-[rgb(124,58,237)]">
                  STEP 03
                </div>
                <h3 className="font-bold text-base mb-3 text-[rgb(238,234,255)]">
                  Ask Anything
                </h3>
                <p
                  className="text-sm leading-relaxed text-[rgb(139,127,196)]"
                >
                  Type any question. Get sourced, accurate answers with page
                  references.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Features;
