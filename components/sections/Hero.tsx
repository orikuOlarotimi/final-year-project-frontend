import React from "react";

const Hero = () => {
  return (
    <div className="px-6 text-center flex  flex-col items-center justify-center" style={{paddingTop: "80px"}}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-8 border border-violet-600/35 bg-violet-600/12 text-violet-300 animate-[heroFade_0.9s_cubic-bezier(0.4,0,0.2,1)_both]">
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
          className="lucide lucide-sparkles w-3.5 h-3.5"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
          <path d="M20 3v4"></path>
          <path d="M22 5h-4"></path>
          <path d="M4 17v2"></path>
          <path d="M5 18H3"></path>
        </svg>
        Powered by GPT-4o · Available now
      </div>
      <h1
        className="font-black leading-[1.08] mb-7 font-['Playfair_Display',_serif] 
  text-[clamp(3rem,8vw,5.5rem)] 
  bg-[linear-gradient(140deg,_rgb(238,234,255)_10%,_rgb(196,181,253)_45%,_rgb(245,158,11)_100%)] 
  bg-clip-text 
  text-transparent 
  animate-[heroFade_0.9s_cubic-bezier(0.4,0,0.2,1)_0.1s_both]"
      >
        Your Documents,
        <br />
        <em>Finally Talking</em>
        <br />
        Back.
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-[rgb(139,127,196)] animate-[heroFade_0.9s_cubic-bezier(0.4,0,0.2,1)_0.22s_both]">
        Upload any PDF, DOCX, or TXT and have a real conversation with it. Ask
        questions, extract insights, get summaries — in seconds, not hours.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[heroFade_0.9s_cubic-bezier(0.4,0,0.2,1)_0.36s_both]">
        <button className="group flex items-center gap-2 px-9 py-4 rounded-2xl bg-[rgb(124,58,237)] text-white font-bold text-base transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_40px_#7c3aed77] hover:scale-105 active:scale-95">
          Start for Free
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
        <button className="group flex items-center gap-2 px-9 py-4 rounded-2xl border border-[rgba(124,58,237,0.35)] font-medium text-base transition-all duration-300 hover:bg-white/5 hover:scale-105 text-[rgb(196,181,253)]">
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
            className="lucide lucide-upload w-4 h-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
          Drop a Document
        </button>
      </div>
      <div className="mt-20 mx-auto max-w-3xl animate-[heroFade_1s_cubic-bezier(0.4,0,0.2,1)_0.55s_both]">
        <div
          className="rounded-3xl border overflow-hidden border border-violet-600/25 
  bg-[#120f2e]/85 
  shadow-[0_0_80px_rgba(124,58,237,0.157),_0_40px_80px_rgba(0,0,0,0.4)] 
  backdrop-blur-[24px]"
        >
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[rgba(124,58,237,0.18)] ">
            <div className="w-3 h-3 rounded-full bg-[rgb(255,95,87)]/70"></div>
            <div className="w-3 h-3 rounded-full bg-[rgb(254,188,46)]/70"></div>
            <div className="w-3 h-3 rounded-full bg-[rgb(40,200,64)]/70"></div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 h-5 rounded-full flex items-center gap-1.5 bg-[rgba(255,255,255,0.05)]">
                <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-70"></div>
                <span className="text-[11px] font-mono text-[rgb(139,127,196)]">
                  app.documind.ai
                </span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-5 min-h-[300px]">
            <div className="md:col-span-2 p-4 border-r space-y-2 border border-violet-600/[0.18]">
              <div className="rounded-xl p-3 flex items-start gap-2.5  bg-violet-600/15 border border-violet-600/35">
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
                  className="lucide lucide-file-text w-4 h-4 mt-0.5 shrink-0 text-[rgb(196,181,253)]"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                <div>
                  <div className="text-xs font-semibold text-[rgb(238,234,255)]">
                    Q3_Strategy_2024.pdf
                  </div>
                  <div className="text-[11px] mt-0.5 text-[rgb(139,127,196)]">
                    62 pages · Active
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-3 flex items-center gap-2.5 transition-colors duration-200 cursor-pointer hover:bg-white/5">
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
                  className="lucide lucide-file-text w-4 h-4 shrink-0 text-[rgb(139,127,196)]"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                <span className="text-xs truncate text-[rgb(139,127,196)]">
                  NDA_Draft_v3.docx
                </span>
              </div>
              <div className="rounded-xl p-3 flex items-center gap-2.5 transition-colors duration-200 cursor-pointer hover:bg-white/5">
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
                  className="lucide lucide-file-text w-4 h-4 shrink-0 text-[rgb(139,127,196)]"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                <span className="text-xs truncate text-[rgb(139,127,196)]">
                  Meeting_Notes_May.txt
                </span>
              </div>
            </div>
            <div className="md:col-span-3 p-4 flex flex-col gap-3">
              <div className="flex justify-end">
                <div className="max-w-[88%] text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed bg-[rgb(124,58,237)] text-[rgb(255,255,255)]">
                  What was our projected revenue for Q4?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[88%] text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed bg-[rgba(255,255,255,0.07)] text-[rgb(238,234,255)] border border-violet-600/20">
                  <div className="flex items-center gap-1 mb-1.5 text-[rgb(196,181,253)]">
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
                      className="lucide lucide-sparkles w-2.5 h-2.5"
                    >
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                      <path d="M20 3v4"></path>
                      <path d="M22 5h-4"></path>
                      <path d="M4 17v2"></path>
                      <path d="M5 18H3"></path>
                    </svg>
                    <span className="text-[10px] font-semibold tracking-wide">
                      DOCUMIND
                    </span>
                  </div>
                  Q4 projected revenue is $5.8M, up 28% from Q3. The growth is
                  driven by enterprise tier expansion in APAC. See page 34.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[88%] text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed bg-violet-600 text-white">
                  Which market segment leads growth?
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border bg-white/4 border border-violet-600/20">
                <span className="text-xs flex-1 text-[rgb(139,127,196)]">
                  Ask anything about this document…
                </span>
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
                  className="lucide lucide-arrow-right w-3 h-3 text-[rgb(139,127,196)]"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
