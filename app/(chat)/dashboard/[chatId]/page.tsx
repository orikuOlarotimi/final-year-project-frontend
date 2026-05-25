"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/src/lib/api";
import TopBar from "@/components/TopBar";
import DocumentsBar from "@/components/DocumentsBar";
import MessageList from "@/components/MessageList";
import MessageInput from "@/components/MessageInput";
import UploadModal from "@/components/UploadModal";

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

type ChatDetails = {
  chat_id: string;
  title: string;
  active_document_id?: string;
  created_at: string;
  updated_at: string;
};

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.chatId as string;

  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingChat, setLoadingChat] = useState(true);

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingDocumentId, setLoadingDocumentId] = useState<string | null>(
    null,
  );

  // ── Fetch chat on mount or chatId change ──────────────────────────────────
  const fetchChat = async () => {
    try {
      setLoadingChat(true);
      const response = await apiFetch(`/chat/chats/${chatId}`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "Failed to load chat");
        return;
      }

      setChat(data.chat);
      setMessages(data.messages || []);
      setDocuments(data.documents || []);
      setSelectedDocumentId(null);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load chat");
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    if (chatId) fetchChat();
  }, [chatId]);

  // ── Document polling ──────────────────────────────────────────────────────
  const pollDocumentStatus = (documentId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await apiFetch(`/documents/${documentId}/status`);
        const data = await response.json();

        if (!response.ok) {
          clearInterval(interval);
          toast.error(
            data?.detail?.message || "Failed to check document status",
          );
          return;
        }

        if (data.document.status === "processed") {
          clearInterval(interval);
          toast.success("Document processed successfully");
          fetchChat(); // Refresh documents list
        }

        if (data.document.status === "failed") {
          clearInterval(interval);
          toast.error("Document processing failed");
        }
      } catch (error) {
        clearInterval(interval);
        console.error(error);
      }
    }, 3000);
  };

  // ── File upload ───────────────────────────────────────────────────────────
  const handleFiles = async (files: File[]) => {
    if (documents.length + files.length > 5) {
      toast.error("Maximum of 5 documents allowed");
      return;
    }

    const allowedExtensions = ["pdf", "docx", "txt"];

    for (const file of files) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension || !allowedExtensions.includes(extension)) {
        toast.error(`${file.name} is not supported`);
        return;
      }
      if (file.size / (1024 * 1024) > 5) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return;
      }
    }

    try {
      setUploading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append("chat_id", chatId);
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

        toast.success(`${file.name} uploaded — processing...`);
        pollDocumentStatus(data.document.id);
      }

      setUploadModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ── Send message ──────────────────────────────────────────────────────────
  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      toast.error("Message cannot be empty");
      return;
    }
    if (sendingMessage) return;

    try {
      setSendingMessage(true);

      const userMessage: Message = {
        message_id: `temp-user-${Date.now()}`,
        role: "user",
        content: trimmedMessage,
        created_at: new Date().toISOString(),
        document_id: selectedDocumentId || null,
      };

      const loadingMessage: Message = {
        message_id: `temp-bot-${Date.now()}`,
        role: "assistant",
        content: "",
        created_at: new Date().toISOString(),
        loading: true,
      };

      // Optimistic update
      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setMessage("");

      const payload: {
        chat_id: string;
        message: string;
        document_id?: string;
      } = {
        chat_id: chatId,
        message: trimmedMessage,
      };
      if (selectedDocumentId) payload.document_id = selectedDocumentId;

      const response = await apiFetch("/message/message", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => prev.filter((msg) => !msg.loading));
        toast.error(data?.detail?.message || "Failed to send message");
        return;
      }

      // Replace loading dot with real response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading
            ? {
                message_id: `assistant-${Date.now()}`,
                role: "assistant" as const,
                content: data.answer,
                created_at: new Date().toISOString(),
              }
            : msg,
        ),
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) => prev.filter((msg) => !msg.loading));
      toast.error("Unable to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleDocumentSelect = async (id: string) => {
    try {
      if (loadingDocumentId) return; // prevent multiple clicks

      setLoadingDocumentId(id);

      const response = await apiFetch(
        `/chat/chats/${chatId}/messages?document_id=${id}`,
        {
          method: "GET",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data?.detail?.message || "Error getting document history");
        return;
      }

      // SUCCESS → set document ONLY after backend confirms
      setSelectedDocumentId(id);

      // // optionally update messages if you want
      // setMessages(data.messages || []);

      toast.success("Document history loaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error getting message history");
    } finally {
      setLoadingDocumentId(null);
    }
  };

  return (
    <>
      <TopBar title={chat?.title || "DocuMind"} />

      <DocumentsBar
        documents={documents}
        selectedDocumentId={selectedDocumentId}
        loadingDocumentId={loadingDocumentId}
        onSelect={handleDocumentSelect}
      />

      <MessageList messages={messages} loading={loadingChat} />

      <MessageInput
        value={message}
        onChange={setMessage}
        onSend={handleSendMessage}
        onUploadOpen={() => setUploadModalOpen(true)}
        disabled={sendingMessage}
      />

      {uploadModalOpen && (
        <UploadModal
          onClose={() => setUploadModalOpen(false)}
          onFiles={handleFiles}
          uploading={uploading}
        />
      )}
    </>
  );
}
