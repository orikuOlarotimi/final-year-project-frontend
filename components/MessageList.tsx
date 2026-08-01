"use client";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

type Message = {
  message_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  document_id?: string | null;
  loading?: boolean;
};

type MessageListProps = {
  messages: Message[];
  loading: boolean;
};

export default function MessageList({ messages, loading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-sm text-[#8b7fc4] animate-pulse">
          Loading messages...
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-sm text-[#8b7fc4]">
          Start chatting with your documents
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg) => (
        <div
          key={msg.message_id}
          className={
            msg.role === "user" ? "flex justify-end" : "flex justify-start"
          }
        >
          {msg.role === "user" ? (
            <div className="max-w-[75%]">
              <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed bg-gradient-to-br from-violet-600 to-violet-700 text-white">
                {msg.content}
              </div>
              <div className="text-xs mt-1.5 text-right text-[#8b7fc4]">
                {new Date(msg.created_at).toLocaleTimeString()}
              </div>
            </div>
          ) : (
            <div className="max-w-[75%] flex gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-violet-600 to-pink-500">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed bg-[rgba(30,27,75,0.5)] border border-violet-500/20 text-[#eeeaff] whitespace-pre-wrap">
                  {msg.loading ? (
                    <div className="flex items-center gap-1 py-1">
                      <div className="w-2 h-2 rounded-full bg-violet-300 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-violet-300 animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-violet-300 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                <div className="text-xs mt-1.5 text-[#8b7fc4]">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
