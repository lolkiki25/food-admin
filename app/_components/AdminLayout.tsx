import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

//wrapper component
export const AdminLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const customStyle = className + " w-full";
  return (
    <div className="flex bg-gray-100 gap-6 w-screen">
      <Sidebar />
      <div className={customStyle}>
        <Header />
        {children}
      </div>
    </div>
  );
};