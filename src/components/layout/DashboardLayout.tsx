import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-screen bg-(--color-bg-primary) transition-colors duration-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 p-5 overflow-y-auto bg-(--color-bg-primary)">
          {children}
        </div>
      </div>
    </div>
  );
}
