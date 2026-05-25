import TopBar from "../../../components/TopBar";
import { Brain, MessageSquare, Sparkles, Upload } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <TopBar />
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_12px_48px_rgba(124,58,237,0.4)]">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-black mb-3 font-['Playfair_Display'] text-[#eeeaff]">
            Welcome to DocuMind!
          </h1>

          <p className="text-sm mb-8 text-[#8b7fc4]">
            Select a chat from the sidebar or create a new one to get started.
          </p>

          <div className="grid gap-4 text-left">
            {[
              {
                icon: Upload,
                title: "Upload Documents",
                desc: "Add up to 5 files per chat (PDF, DOCX, TXT)",
              },
              {
                icon: MessageSquare,
                title: "Ask Questions",
                desc: "Chat naturally with your documents",
              },
              {
                icon: Brain,
                title: "Get Insights",
                desc: "Extract summaries and answers instantly",
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
                    <div className="text-xs text-[#8b7fc4]">{feature.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
