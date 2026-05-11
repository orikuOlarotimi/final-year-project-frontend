"use client"
import React, { useState } from "react";

const TOS = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [secIsOpen, setSecIsOpen] = useState(false);
  const [isLiabilityOpen, setIsLiabilityOpen] = useState(false);
  const [isFormatsOpen, setIsFormatsOpen] = useState(true);
  return (
    <div>
      <section id="terms" className="py-32 max-w-3xl mx-auto px-6">
        <div className="text-center mb-14 opacity-100 transform-none transition-all duration-[750ms] ease-in-out">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6 border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.1)] text-[rgb(147,197,253)]">
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
              className="lucide lucide-shield w-3.5 h-3.5"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>{" "}
            Legal
          </div>
          <h2 className="font-black leading-tight font-['Playfair_Display',_serif] text-[clamp(2rem,5vw,3.25rem)] text-[#eeeaff]">
            Terms of Service
          </h2>
          <p className="text-sm mt-3 text-[rgb(139,127,196)]">
            Last updated May 2026 · By using DocuMind you agree to these terms.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="opacity-100 transform-none transition-all duration-[750ms] ease-in-out">
            <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-[rgba(124,58,237,0.267)] bg-[rgba(18,15,46,0.8)] shadow-[0_0_40px_rgba(124,58,237,0.094)]">
              <button
                onClick={() => setIsFormatsOpen(!isFormatsOpen)}
                className="w-full flex items-center justify-between px-6 py-5 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[rgba(124,58,237,0.133)] text-[rgb(124,58,237)]">
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
                      className="w-4 h-4"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                      <path d="m9 15 2 2 4-4"></path>
                    </svg>
                  </span>

                  <span className="font-semibold text-sm text-[rgb(238,234,255)] font-['Plus_Jakarta_Sans',_sans-serif]">
                    Accepted File Formats
                  </span>
                </div>

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
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[rgb(139,127,196)] ${
                    isFormatsOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isFormatsOpen
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed mb-5 text-[rgb(139,127,196)]">
                    DocuMind processes exactly three file types. Any other
                    format will be rejected at upload with an error message.
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl p-4 text-center border border-[rgba(124,58,237,0.267)] bg-[rgba(124,58,237,0.067)]">
                      <div className="font-mono font-bold text-base mb-1 text-[rgb(124,58,237)]">
                        .PDF
                      </div>
                      <div className="text-xs text-[rgb(139,127,196)]">
                        Portable Document Format
                      </div>
                    </div>

                    <div className="rounded-xl p-4 text-center border border-[rgba(245,158,11,0.267)] bg-[rgba(245,158,11,0.067)]">
                      <div className="font-mono font-bold text-base mb-1 text-[rgb(245,158,11)]">
                        .DOCX
                      </div>
                      <div className="text-xs text-[rgb(139,127,196)]">
                        Microsoft Word Document
                      </div>
                    </div>

                    <div className="rounded-xl p-4 text-center border border-[rgba(16,185,129,0.267)] bg-[rgba(16,185,129,0.067)]">
                      <div className="font-mono font-bold text-base mb-1 text-[rgb(16,185,129)]">
                        .TXT
                      </div>
                      <div className="text-xs text-[rgb(139,127,196)]">
                        Plain Text File
                      </div>
                    </div>
                  </div>

                  <p className="text-xs mt-4 text-[rgb(139,127,196)]">
                    Max file size: 5 MB. Password-protected PDFs must be
                    unlocked before upload.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[70ms] ease-in-out">
            <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-[rgba(124,58,237,0.18)] bg-[rgba(18,15,46,0.8)] shadow-none">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-5 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[rgba(236,72,153,0.133)] text-[rgb(236,72,153)]">
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
                      className="w-4 h-4"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                  </span>

                  <span className="font-semibold text-sm text-[rgb(238,234,255)] font-['Plus_Jakarta_Sans']">
                    Data Privacy & Retention
                  </span>
                </div>

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
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[rgb(139,127,196)] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                    All uploaded files are encrypted with AES-256 at rest and
                    transmitted over TLS 1.3. Your documents are stored on
                    isolated, access-controlled infrastructure and are never
                    shared with or sold to third parties. Files are
                    automatically purged 90 days after last interaction, or
                    immediately upon account deletion. We do not use your
                    documents to train, fine-tune, or benchmark any AI model —
                    ever.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[140ms] ease-in-out">
            <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-[rgba(124,58,237,0.18)] bg-[rgba(18,15,46,0.8)] shadow-none">
              <button
                onClick={() => setSecIsOpen(!secIsOpen)}
                className="w-full flex items-center justify-between px-6 py-5 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[rgba(16,185,129,0.133)] text-[rgb(16,185,129)]">
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
                      className="w-4 h-4"
                    >
                      <path d="M12 7v14"></path>
                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                    </svg>
                  </span>

                  <span className="font-semibold text-sm text-[rgb(238,234,255)] font-['Plus_Jakarta_Sans',_sans-serif]">
                    Acceptable Use Policy
                  </span>
                </div>

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
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[rgb(139,127,196)] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  secIsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                    DocuMind is intended for lawful personal, academic, and
                    professional use only. You may not upload documents that
                    infringe third-party intellectual property rights, contain
                    malware or exploit code, or include content that violates
                    applicable law. Accounts found in breach of this policy may
                    be suspended or permanently terminated without refund at our
                    sole discretion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-100 transform-none transition-all duration-[750ms] delay-[210ms] ease-in-out">
            <div className="rounded-2xl border overflow-hidden transition-all duration-300 border-[rgba(124,58,237,0.18)] bg-[rgba(18,15,46,0.8)] shadow-none">
              <button
                onClick={() => setIsLiabilityOpen(!isLiabilityOpen)}
                className="w-full flex items-center justify-between px-6 py-5 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[rgba(59,130,246,0.133)] text-[rgb(59,130,246)]">
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
                      className="w-4 h-4"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                      <path d="m9 11 3 3L22 4"></path>
                    </svg>
                  </span>

                  <span className="font-semibold text-sm text-[rgb(238,234,255)] font-['Plus_Jakarta_Sans',_sans-serif]">
                    Limitation of Liability
                  </span>
                </div>

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
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[rgb(139,127,196)] ${
                    isLiabilityOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isLiabilityOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-[rgb(139,127,196)]">
                    AI-generated responses are provided for informational
                    purposes only and may contain inaccuracies. DocuMind is not
                    liable for decisions made on the basis of AI output. Always
                    verify critical information against the source document. For
                    legal, medical, financial, or regulated advice, consult a
                    qualified licensed professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TOS