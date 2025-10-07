import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen gap-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col bg-gray-50 gap-6">
        {/* Header top */}
        <Header />
        {children}
      </div>
    </div>
  );
};
