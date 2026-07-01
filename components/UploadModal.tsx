"use client";
import { useRef } from "react";
import { CheckCircle2, Upload, X } from "lucide-react";

type UploadModalProps = {
  onClose: () => void;
  onFiles: (files: File[]) => void;
  uploading: boolean;
};

export default function UploadModal({
  onClose,
  onFiles,
  uploading,
}: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFiles(droppedFiles);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(9,7,26,0.9)] backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-violet-500/30 bg-[rgba(18,15,46,0.95)] p-8 shadow-[0_24px_80px_rgba(124,58,237,0.3)]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all duration-200 text-[#8b7fc4]"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-black mb-2 font-['Playfair_Display'] text-[#eeeaff]">
          Upload Documents
        </h2>
        <p className="text-sm mb-6 text-[#8b7fc4]">
          Add your document 
        </p>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            if (!e.target.files) return;
            onFiles(Array.from(e.target.files));
          }}
        />

        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-violet-500/30 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 bg-[rgba(30,27,75,0.3)] hover:border-violet-500"
        >
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-violet-500/20">
            <Upload className="w-7 h-7 text-[#c4b5fd]" />
          </div>
          <p className="font-semibold mb-1 text-[#eeeaff]">
            Drop files or click to browse
          </p>
          <p className="text-xs text-[#8b7fc4]">
            Supports PDF, DOCX, TXT · Max 12MB
          </p>
        </div>

        {/* Format Badges */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { ext: ".PDF", color: "text-violet-400" },
            { ext: ".DOCX", color: "text-amber-400" },
            { ext: ".TXT", color: "text-emerald-400" },
          ].map((format) => (
            <div
              key={format.ext}
              className="rounded-xl p-3 text-center border border-white/10 bg-white/[0.03]"
            >
              <CheckCircle2 className={`w-4 h-4 mx-auto mb-1 ${format.color}`} />
              <div className={`text-xs font-bold ${format.color}`}>
                {format.ext}
              </div>
            </div>
          ))}
        </div>

        {uploading && (
          <div className="mt-4 text-center text-sm text-[#c4b5fd] animate-pulse">
            Uploading document...
          </div>
        )}
      </div>
    </div>
  );
}
