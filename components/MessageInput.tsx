"use client";
import { Plus, Send } from "lucide-react";

type MessageInputProps = {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  onUploadOpen: () => void;
  disabled: boolean;
};

export default function MessageInput({
  value,
  onChange,
  onSend,
  onUploadOpen,
  disabled,
}: MessageInputProps) {
  return (
    <div className="p-4 border-t border-violet-500/20 bg-[rgba(18,15,46,0.3)] shrink-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-violet-500/25 bg-[rgba(30,27,75,0.5)]">
          <button
            type="button"
            onClick={onUploadOpen}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200 shrink-0"
          >
            <Plus className="w-4 h-4 text-[#c4b5fd]" />
          </button>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask anything about your documents..."
            rows={1}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            className="flex-1 bg-transparent outline-none resize-none text-sm text-[#eeeaff] placeholder:text-[#8b7fc4] field-sizing-content disabled:opacity-50"
          />

          <button
            onClick={onSend}
            disabled={disabled}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_4px_16px_rgba(124,58,237,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 shrink-0 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="text-xs text-center mt-2 text-[#8b7fc4]">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
