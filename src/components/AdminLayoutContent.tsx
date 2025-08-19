'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutContentProps {
  children: React.ReactNode;
}

const AdminLayoutContent: React.FC<AdminLayoutContentProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutContent;
