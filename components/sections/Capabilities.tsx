import React from "react";

const Capabilities = () => {
  return (
    <div>
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 opacity-100 transform-none transition-all duration-[750ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6 border-violet-600/35 bg-violet-600/12 text-violet-300 ">
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
              className="lucide lucide-zap w-3.5 h-3.5"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>{" "}
            Capabilities
          </div>
          <h2 className="font-black leading-tight font-['Playfair_Display',_serif] text-[clamp(2.2rem,5vw,3.75rem)] text-[#eeeaff]">
            Everything you need to
            <br />
            <span className="text-[rgb(196,181,253)]">
              master any document.
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="group opacity-100  transition-all duration-300 delay-[70ms] ease-in-out ">
            <div className="group relative rounded-2xl p-6 border cursor-default overflow-hidden transition-all duration-350 border-violet-600/20 bg-[#120f2e]/70 translate-y-0 shadow-none hover:border-[#7c3aed]/30 hover:-translate-y-1.5  hover:shadow-[0_24px_56px_rgba(124,58,237,0.13)]">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-[rgba(124,58,237,0.2)] text-[rgb(124,58,237)]">
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
              <h3 className="font-bold text-sm mb-2 text-[rgb(238,234,255)]">
                Deep Document Intelligence
              </h3>
              <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                Semantic understanding extracts meaning across every page — not
                just keywords.
              </p>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[70ms] ease-in-out">
            <div className="group relative rounded-2xl p-6 border cursor-default overflow-hidden transition-all duration-350 border-violet-600/18 bg-[#120f2e]/70 translate-y-0 shadow-none hover:border-[#f59e0b]/30 hover:shadow-[0_24px_56px_rgba(245,158,11,0.13)] hover:-translate-y-1.5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-[rgba(245,158,11,0.2)] text-[rgb(245,158,11)]">
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
              <h3 className="font-bold text-sm mb-2 text-[rgb(238,234,255)]">
                Conversational Q&amp;A
              </h3>
              <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                Ask anything in plain language. Get cited, contextual answers
                instantly.
              </p>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[140ms] ease-in-out">
            <div className="group relative rounded-2xl p-6 border cursor-default overflow-hidden transition-all duration-350 border border-[rgba(124,58,237,0.18)] bg-[rgba(18,15,46,0.7)]  transition-all hover:-translate-y-1.5 hover:border-[#10b981]/30 hover:shadow-[0_24px_56px_rgba(16,185,129,0.13)]">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 text-[rgb(16,185,129)] bg-[rgba(16,185,129,0.2)]">
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
                  className="lucide lucide-zap w-5 h-5"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-sm mb-2 text-[rgb(238,234,255)]">
                Instant Summaries
              </h3>
              <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                Executive summaries, bullet lists, chapter breakdowns — one
                click.
              </p>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[210ms] ease-in-out">
            <div className="group relative rounded-2xl p-6 border cursor-default overflow-hidden transition-all duration-350 translate-y-0 shadow-none border border-[rgba(124,58,237,0.18)] bg-[rgba(18,15,46,0.7)] hover:-translate-y-1.5 hover:border-[#3b82f6]/30 hover:shadow-[0_24px_56px_rgba(59,130,246,0.13)]">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-[rgba(59,130,246,0.2)] text-[rgb(59,130,246)]">
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
                  className="lucide lucide-search w-5 h-5"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <h3 className="font-bold text-sm mb-2 text-[rgb(238,234,255)]">
                Semantic Search
              </h3>
              <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                Find exactly the clause you need even when you can't recall the
                exact words.
              </p>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[280ms] ease-in-out">
            <div className="group relative rounded-2xl p-6 border cursor-default overflow-hidden transition-all duration-350 translate-y-0 shadow-none border border-[rgba(124,58,237,0.18)] bg-[rgba(18,15,46,0.7)] hover:-translate-y-1.5 hover:border-[#ec4899]/30 hover:shadow-[0_24px_56px_rgba(236,72,153,0.13)]">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-[rgba(236,72,153,0.2)] text-[rgb(236,72,153)]">
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
                  className="lucide lucide-lock w-5 h-5"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="font-bold text-sm mb-2 text-[rgb(238,234,255)]">
                End-to-End Encryption
              </h3>
              <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                AES-256 at rest, TLS 1.3 in transit. We never train on your
                documents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Capabilities;
