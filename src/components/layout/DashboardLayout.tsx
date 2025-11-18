import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-(--color-bg-primary) transition-colors duration-200">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col w-full md:w-auto">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 p-3 md:p-5 overflow-y-auto bg-(--color-bg-primary)">
          {children}
        </div>
      </div>
    </div>
  );
}
