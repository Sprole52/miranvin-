'use client'
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && !isLoginPage) {
        // Not authenticated and not on login page, redirect to login
        router.push('/admin/login');
      } else if (isAuthenticated && isLoginPage) {
        // Already authenticated and on login page, redirect to admin dashboard
        router.push('/admin');
      }
    }
  }, [isAuthenticated, loading, isLoginPage, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Show children if authenticated or on login page
  if (isAuthenticated || isLoginPage) {
    return <>{children}</>;
  }

  // This should not be reached due to useEffect redirect, but just in case
  return null;
};

export default AdminAuth;
