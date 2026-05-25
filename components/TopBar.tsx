"use client";
import Link from "next/link";
import { MessageSquare, PanelLeftClose } from "lucide-react";
import { useSidebar } from "../src/context/SidebarContext";

type TopBarProps = {
  title?: string;
};

export default function TopBar({ title = "DocuMind" }: TopBarProps) {
  const { toggle } = useSidebar();

  return (
    <header className="h-14 px-6 border-b border-violet-500/20 bg-[rgba(18,15,46,0.3)] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all duration-200 text-[#c4b5fd]"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#c4b5fd]" />
          <span className="text-sm font-semibold text-[#eeeaff]">{title}</span>
        </div>
      </div>

      <Link
        href="/"
        className="text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 text-[#8b7fc4]"
      >
        Back to Home
      </Link>
    </header>
  );
}
