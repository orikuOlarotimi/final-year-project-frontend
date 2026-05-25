"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  LogOut,
  MessageSquare,
  Plus,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "../src/lib/api";
import { useSidebar } from "../src/context/SidebarContext";

type Chat = {
  chat_id: string;
  preview: string;
  created_at: string;
  updated_at: string;
};

export default function Sidebar() {
  const { open } = useSidebar();
  const router = useRouter();
  const params = useParams();
  const activeChatId = params?.chatId as string | undefined;

  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

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

  // Re-fetch sidebar whenever the active chat changes (e.g. new preview)
  useEffect(() => {
    if (activeChatId) fetchChats();
  }, [activeChatId]);

  const handleCreateChat = async () => {
    if (creating) return;
    try {
      setCreating(true);
      const response = await apiFetch("/chat/chats", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.detail?.message || "Failed to create chat");
        return;
      }
      // Refresh sidebar then navigate to new chat
      await fetchChats();
      router.push(`/dashboard/${data?.chat_id}`);
      toast.success("chat created successfully");
    } catch (error) {
      toast.error("Unable to create chat");
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Always clear local session
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Optional additional cleanup
      localStorage.removeItem("status");

      // Redirect home
      window.location.href = "/";
    }
  };

  return (
    <aside
      className={`border-r border-violet-500/20 bg-[rgba(18,15,46,0.5)] flex flex-col overflow-hidden transition-all duration-300 shrink-0 ${
        open ? "w-[280px]" : "w-0 opacity-0 pointer-events-none"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-violet-500/20 flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#eeeaff]">All Chats</h2>

        <button
          onClick={handleCreateChat}
          disabled={creating}
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <div className="text-xs text-[#8b7fc4] text-center py-6">
            Loading chats...
          </div>
        ) : chats.length === 0 ? (
          <div className="text-xs text-[#8b7fc4] text-center py-6">
            No chats yet. Create one!
          </div>
        ) : (
          chats.map((chat) => {
            const isActive = activeChatId === chat.chat_id;
            return (
              <Link
                key={chat.chat_id}
                href={`/dashboard/${chat.chat_id}`}
                className={`relative w-full rounded-xl p-3 flex items-start gap-3 border transition-all duration-200 text-left
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
                    {chat.preview || "New Chat"}
                  </div>
                  <div className="text-[11px] mt-0.5 text-[#8b7fc4]">
                    {new Date(chat.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
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

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#8b7fc4]" />
          <span className="text-xs text-[#8b7fc4]">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
