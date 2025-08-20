'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  FiBarChart, 
  FiImage, 
  FiFileText, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut,
  FiX,
  FiMenu,
  FiUser,
  FiMapPin
} from 'react-icons/fi';

const AdminSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiBarChart },
    { name: 'Galeri', href: '/admin/galeri', icon: FiImage },
    { name: 'Haberler', href: '/admin/haberler', icon: FiFileText },
    { name: 'Hizmet Bölgeleri', href: '/admin/hizmet-bolgeleri', icon: FiMapPin },
    { name: 'Mesajlar', href: '/admin/mesajlar', icon: FiMessageSquare },
    { name: 'Ayarlar', href: '/admin/ayarlar', icon: FiSettings },
  ];

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div className="relative z-40 lg:hidden">
        {isMobileOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        )}
        
        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          {/* Admin Info - Mobile */}
          {user && (
            <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user.isStaticAdmin ? 'Statik Admin' : 'Veritabanı Admin'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <nav className="mt-6 px-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      pathname === item.href
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Logout button */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Çıkış Yap</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          
          {/* Admin Info - Desktop */}
          {user && (
            <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user.isStaticAdmin ? 'Statik Admin' : 'Veritabanı Admin'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <nav className="mt-6 px-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      pathname === item.href
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Logout button */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Çıkış Yap</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden mobile-menu-container">
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <FiMenu className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
