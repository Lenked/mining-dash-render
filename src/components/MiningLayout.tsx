import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MiningSidebar } from "./MiningSidebar";

interface MiningLayoutProps {
  children: ReactNode;
}

export function MiningLayout({ children }: MiningLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-dashboard-bg dark">
        <MiningSidebar  />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
