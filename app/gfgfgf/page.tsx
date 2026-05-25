"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Brain,
  CheckCircle2,
  File,
  FileText,
  LogOut,
  MessageSquare,
  PanelLeft,
  PanelLeftClose,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  X,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "../../../src/lib/api";
type Chat = {
  chat_id: string;
  preview: string;
  created_at: string;
  updated_at: string;
};

type Message = {
  message_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  document_id?: string | null;
  loading?: boolean;
};

type Document = {
  document_id: string;
  filename: string;
  file_type?: string;
  created_at: string;
};

type SelectedChat = {
  chat_id: string;
  title: string;
  active_document_id?: string;
  created_at: string;
  updated_at: string;
};

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingSidebar, setLoadingSidebar] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );
  const [sendingMessage, setSendingMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const fetchChats = async () => {
    try {
      const response = await apiFetch("/chat/chats");

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "Failed to fetch chats");
        return;
      }

      setChats(data.chats || []);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const fetchChat = async (chatId: string) => {
    try {
      setLoadingChat(true);

      const response = await apiFetch(`/chat/chats/${chatId}`);

      const data = await response.json();

      if (!response.ok) {
        console.log(response, data);
        toast.error(data?.detail?.message || "Failed to load chat");
        return;
      }

      setSelectedChat(data.chat);

      setMessages(data.messages || []);
      setSelectedDocumentId(null);
      setDocuments(data.documents || []);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load chat");
    } finally {
      setLoadingChat(false);
    }
  };

  const handleCreateChat = async () => {
    try {
      const response = await apiFetch("/chat/chats", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "Failed to create chat");
        return;
      }

      // IMPORTANT: re-fetch sidebar chats
      await fetchChats();

      toast.success("Chat created");
    } catch (error) {
      toast.error("Unable to create chat");
    }
  };

  const pollDocumentStatus = async (documentId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await apiFetch(`/documents/${documentId}/status`);

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          clearInterval(interval);

          toast.error(
            data?.detail?.message || "Failed to check document status",
          );

          return;
        }

        // DOCUMENT FINISHED PROCESSING
        if (data.document.status === "processed") {
          clearInterval(interval);

          toast.success("Document processed successfully");

          // Refresh chat to update documents UI
          if (selectedChat) {
            fetchChat(selectedChat.chat_id);
          }
          return;
        }

        // DOCUMENT FAILED
        if (data.status === "failed") {
          clearInterval(interval);

          toast.error("Document processing failed");
        }
      } catch (error) {
        console.error(error);

        clearInterval(interval);

        toast.error("Failed to check document status");
      }
    }, 3000);
  };

  const handleFiles = async (files: File[]) => {
    if (!selectedChat) {
      toast.error("Please select or create a chat first");
      return;
    }

    if (documents.length + files.length > 5) {
      toast.error("Maximum of 5 documents allowed");
      return;
    }

    const allowedExtensions = ["pdf", "docx", "txt"];

    for (const file of files) {
      const extension = file.name.split(".").pop()?.toLowerCase();

      // File type validation
      if (!extension || !allowedExtensions.includes(extension)) {
        toast.error(`${file.name} is not supported`);
        return;
      }

      // 5MB validation
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > 5) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return;
      }
    }

    try {
      setUploading(true);

      for (const file of files) {
        const formData = new FormData();

        formData.append("chat_id", selectedChat.chat_id);

        formData.append("file", file);

        const response = await apiFetch("/documents/upload", {
          method: "POST",
          body: formData,
          headers: {},
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data?.detail?.message || "Upload failed");
          continue;
        }

        toast.success(`${file.name} uploaded`);

        // Refetch chat documents

        // Start polling
        pollDocumentStatus(data.document.id);
        return;
      }

      setUploadModalOpen(false);
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChat) return;

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast.error("Message cannot be empty");
      return;
    }

    if (sendingMessage) return;

    try {
      setSendingMessage(true);

      // USER MESSAGE
      const userMessage: Message = {
        message_id: `temp-user-${Date.now()}`,
        role: "user",
        content: trimmedMessage,
        created_at: new Date().toISOString(),
        document_id: selectedDocumentId || null,
      };

      // LOADING BOT MESSAGE
      const loadingMessage: Message = {
        message_id: `temp-bot-${Date.now()}`,
        role: "assistant",
        content: "",
        created_at: new Date().toISOString(),
        loading: true,
      };

      // OPTIMISTIC UPDATE
      setMessages((prev) => [...prev, userMessage, loadingMessage]);

      // CLEAR INPUT IMMEDIATELY
      setMessage("");

      const payload: {
        chat_id: string;
        message: string;
        document_id?: string;
      } = {
        chat_id: selectedChat.chat_id,
        message: trimmedMessage,
      };

      // ONLY SEND DOCUMENT IF SELECTED
      if (selectedDocumentId) {
        payload.document_id = selectedDocumentId;
      }

      const response = await apiFetch("/message/message", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // REMOVE LOADING MESSAGE
        setMessages((prev) => prev.filter((msg) => !msg.loading));

        toast.error(data?.detail?.message || "Failed to send message");

        return;
      }

      // REPLACE LOADING MESSAGE WITH REAL RESPONSE
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                message_id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.answer,
                created_at: new Date().toISOString(),
              }
            : msg,
        ),
      );

      // REFRESH SIDEBAR PREVIEW
      // fetchChats();
    } catch (error) {
      console.error(error);

      // REMOVE LOADING MESSAGE
      setMessages((prev) => prev.filter((msg) => !msg.loading));

      toast.error("Unable to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[#09071a] text-white">
      {/* Sidebar */}
      <aside
        className={`border-r border-violet-500/20 bg-[rgba(18,15,46,0.5)] flex flex-col overflow-hidden transition-all duration-300  ${sidebarOpen ? "w-[280px]" : "w-0 opacity-0"}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-violet-500/20 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#eeeaff]">All Chats</h2>

          <button
            onClick={handleCreateChat}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all duration-200 hover:scale-110 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading ? (
            <div className="text-xs text-[#8b7fc4] text-center py-6">
              Loading chats...
            </div>
          ) : chats.length === 0 ? (
            <div className="text-xs text-[#8b7fc4] text-center py-6">
              No chats yet
            </div>
          ) : (
            chats.map((chat) => {
              const isActive = selectedChatId === chat.chat_id;
              return (
                <div key={chat.chat_id} className="group">
                  <button
                    onClick={() => {
                      setSelectedChatId(chat.chat_id);
                      fetchChat(chat.chat_id);
                    }}
                    className={`relative w-full rounded-xl p-3 flex items-start gap-3 border transition-all duration-200 text-left cursor-pointer
            ${
              isActive
                ? "bg-violet-500/10 border-violet-500/40 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                : "border-transparent hover:bg-white/[0.03]"
            }`}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-violet-500/10 text-[#8b7fc4]">
                      <MessageSquare className="w-4 h-4" />
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs font-semibold truncate text-[#eeeaff]">
                        {chat.preview}
                      </div>

                      <div className="text-[11px] mt-0.5 text-[#8b7fc4]">
                        {new Date(chat.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    {/* <button
                    type="button"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button> */}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-violet-500/20 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 text-left cursor-pointer">
            <Settings className="w-4 h-4 text-[#8b7fc4]" />

            <span className="text-xs text-[#8b7fc4]">Settings</span>
          </button>

          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 text-[#8b7fc4]" />

            <span className="text-xs text-[#8b7fc4]">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Topbar */}
        <header className="h-14 px-6 border-b border-violet-500/20 bg-[rgba(18,15,46,0.3)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all duration-200 text-[#c4b5fd]"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#c4b5fd]" />

              <span className="text-sm font-semibold text-[#eeeaff]">
                DocuMind
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 text-[#8b7fc4]"
          >
            Back to Home
          </Link>
        </header>

        {/* Welcome Screen */}
        {!selectedChat && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_12px_48px_rgba(124,58,237,0.4)]">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl font-black mb-3 font-['Playfair_Display'] text-[#eeeaff]">
                Welcome to DocuMind!
              </h1>

              <p className="text-sm mb-8 text-[#8b7fc4]">
                Get started by creating your first chat.
              </p>

              <div className="grid gap-4 text-left">
                {[
                  {
                    icon: Upload,
                    title: "Upload Documents",
                    desc: "Add up to 5 files per chat",
                  },
                  {
                    icon: MessageSquare,
                    title: "Ask Questions",
                    desc: "Chat with your documents",
                  },
                  {
                    icon: Brain,
                    title: "Get Insights",
                    desc: "Extract summaries instantly",
                  },
                ].map((feature, i) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-xl border border-violet-500/20 bg-[rgba(18,15,46,0.5)]"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-violet-500/20 text-[#c4b5fd]">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="text-sm font-semibold mb-1 text-[#eeeaff]">
                          {feature.title}
                        </div>

                        <div className="text-xs text-[#8b7fc4]">
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CHAT SECTION */}
        {selectedChat && (
          <>
            {/* DOCUMENTS BAR */}
            <div className="px-6 py-4 border-b border-violet-500/20 bg-[rgba(18,15,46,0.2)] ">
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {documents.length === 0 ? (
                  <div className="text-xs text-[#8b7fc4]">
                    No documents uploaded yet
                  </div>
                ) : (
                  documents.map((doc) => {
                    const isSelected = selectedDocumentId === doc.document_id;

                    return (
                      <button
                        key={doc.document_id}
                        onClick={() => setSelectedDocumentId(doc.document_id)}
                        className={`
        group relative flex items-center gap-2 px-3 py-2 rounded-xl 
        shrink-0 transition-all duration-200 cursor-pointer border
        ${
          isSelected
            ? "border-violet-500 bg-violet-500/10 shadow-[0_0_0_1px_rgba(139,92,246,0.4),0_0_20px_rgba(124,58,237,0.25)]"
            : "border-violet-500/20 bg-[rgba(30,27,75,0.5)] hover:border-violet-500/40"
        }
      `}
                      >
                        <div
                          className={`
          w-6 h-6 rounded-lg flex items-center justify-center
          ${
            isSelected
              ? "bg-violet-500/30 text-violet-200"
              : "bg-violet-500/20 text-violet-300"
          }
        `}
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

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loadingChat ? (
                <div className="text-sm text-[#8b7fc4]">Loading chat...</div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-sm text-[#8b7fc4]">
                    Start chatting with your documents
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.message_id}
                    className={
                      message.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    {message.role === "user" ? (
                      <div className="max-w-[75%]">
                        <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed bg-gradient-to-br from-violet-600 to-violet-700 text-white">
                          {message.content}
                        </div>

                        <div className="text-xs mt-1.5 text-right text-[#8b7fc4]">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-[75%] flex gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-violet-600 to-pink-500">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>

                        <div>
                          <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed bg-[rgba(30,27,75,0.5)] border border-violet-500/20 text-[#eeeaff]">
                            {message.loading ? (
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
                              message.content
                            )}
                          </div>

                          <div className="text-xs mt-1.5 text-[#8b7fc4]">
                            {new Date(message.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-violet-500/20 bg-[rgba(18,15,46,0.3)]">
              <div className="max-w-4xl mx-auto ">
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-violet-500/25 bg-[rgba(30,27,75,0.5)] ">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(true)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-violet-500/30 hover:bg-violet-500/10 transition-all duration-200 shrink-0"
                  >
                    <Plus className="w-4 h-4 text-[#c4b5fd]" />
                  </button>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything about this document..."
                    rows={1}
                    disabled={sendingMessage}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();

                        handleSendMessage();
                      }
                    }}
                    className="flex-1 bg-transparent outline-none resize-none text-sm text-[#eeeaff] placeholder:text-[#8b7fc4] field-sizing-content disabled:opacity-50"
                  />

                  <button
                    onClick={handleSendMessage}
                    disabled={sendingMessage}
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
          </>
        )}
      </main>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(9,7,26,0.9)] backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-violet-500/30 bg-[rgba(18,15,46,0.95)] p-8 shadow-[0_24px_80px_rgba(124,58,237,0.3)]">
            {/* Close */}
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all duration-200 text-[#8b7fc4]"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-2xl font-black mb-2 font-['Playfair_Display'] text-[#eeeaff]">
              Upload Documents
            </h2>

            <p className="text-sm mb-6 text-[#8b7fc4]">
              Add up to 5 documents (max 5MB each)
            </p>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                if (!e.target.files) return;

                handleFiles(Array.from(e.target.files));
              }}
            />

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();

                const droppedFiles = Array.from(e.dataTransfer.files);

                handleFiles(droppedFiles);
              }}
              className="border-2 border-dashed border-violet-500/30 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 bg-[rgba(30,27,75,0.3)] hover:border-violet-500"
            >
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-violet-500/20">
                <Upload className="w-7 h-7 text-[#c4b5fd]" />
              </div>

              <p className="font-semibold mb-1 text-[#eeeaff]">
                Drop files or folders here
              </p>

              <p className="text-xs text-[#8b7fc4]">
                Supports PDF, DOCX, TXT · Max 5MB
              </p>
            </div>

            {/* Formats */}
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
                  <CheckCircle2
                    className={`w-4 h-4 mx-auto mb-1 ${format.color}`}
                  />

                  <div className={`text-xs font-bold ${format.color}`}>
                    {format.ext}
                  </div>
                </div>
              ))}
            </div>

            {uploading && (
              <div className="mt-4 text-center text-sm text-[#c4b5fd]">
                Uploading document...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
