"use client";
import { FileText } from "lucide-react";

type Document = {
  document_id: string;
  filename: string;
  file_type?: string;
  created_at: string;
};

type DocumentsBarProps = {
  documents: Document[];
  selectedDocumentId: string | null;
  onSelect: (id: string) => void;
  loadingDocumentId: string | null;
};

export default function DocumentsBar({
  documents,
  selectedDocumentId,
  onSelect,
  loadingDocumentId,
}: DocumentsBarProps) {
  return (
    <div className="px-6 py-4 border-b border-violet-500/20 bg-[rgba(18,15,46,0.2)] shrink-0">
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {documents.length === 0 ? (
          <div className="text-xs text-[#8b7fc4]">
            No documents uploaded yet — click{" "}
            <span className="text-violet-400 font-semibold">+</span> to add one
          </div>
        ) : (
          documents.map((doc) => {
            const isSelected = selectedDocumentId === doc.document_id;
            const isLoading = loadingDocumentId === doc.document_id;
            return (
              <button
                key={doc.document_id}
                disabled={isLoading}
                onClick={() => onSelect(doc.document_id)}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl shrink-0 transition-all duration-200 cursor-pointer border
                  ${
                    isSelected
                      ? "border-violet-500 bg-violet-500/10 shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_0_20px_rgba(124,58,237,0.25)]"
                      : "border-violet-500/20 bg-[rgba(30,27,75,0.5)] hover:border-violet-500/40"
                  } ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl backdrop-blur-sm">
                    <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center
                    ${isSelected ? "bg-violet-500/30 text-violet-200" : "bg-violet-500/20 text-violet-300"}`}
                >
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold truncate max-w-[120px] text-[#eeeaff]">
                    {doc.filename}
                  </div>
                  <div className="text-[10px] text-[#8b7fc4]">
                    {doc.file_type}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
