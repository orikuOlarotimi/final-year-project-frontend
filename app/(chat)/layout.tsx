import { SidebarProvider } from "../../src/context/SidebarContext"
import Sidebar from "../../components/Sidebar"
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-screen overflow-hidden flex bg-[#09071a] text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
