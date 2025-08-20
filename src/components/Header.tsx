'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Admin sayfasında Header'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
        : 'bg-white lg:bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image 
                src="/logo.png"
                alt="Seka Altyapı Logo"
                width={200}
                height={60}
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            
          </Link>

          {/* Desktop Navigation - Moved to right side */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Ana Sayfa
            </Link>
            <Link href="/hizmetlerimiz" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Hizmetlerimiz
            </Link>
            <Link href="/hizmet-bolgelerimiz" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Hizmet Bölgelerimiz
            </Link>
            <Link href="/galeri" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Galeri
            </Link>
            <Link href="/haberler" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Haberler
            </Link>
            <Link href="/hakkimizda" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              Hakkımızda
            </Link>
            <Link href="/iletisim" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 hover:text-amber-600 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              İletişim
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 z-50 rounded-lg transition-all duration-300 touch-button hover:bg-gray-100 relative ${
              isMenuOpen ? 'bg-gray-100' : ''
            }`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 transition-all duration-300 bg-gray-600 absolute ${
                isMenuOpen ? 'rotate-45' : 'translate-y-[-6px]'
              }`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 bg-gray-600 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 bg-gray-600 absolute ${
                isMenuOpen ? '-rotate-45' : 'translate-y-[6px]'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 transition-all duration-500 ease-in-out overflow-hidden mobile-menu-container bg-white shadow-lg ${
          isMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <nav className={`py-4 space-y-2 border-t ${
            isScrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            <Link href="/" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              Ana Sayfa
            </Link>
            <Link href="/hizmetlerimiz" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              Hizmetlerimiz
            </Link>
            <Link href="/hizmet-bolgelerimiz" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              Hizmet Bölgelerimiz
            </Link>
            <Link href="/galeri" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              Galeri
            </Link>
            <Link href="/haberler" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              Haberler
            </Link>
            <Link href="/hakkimizda" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              Hakkımızda
            </Link>
            <Link href="/iletisim" className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 touch-button text-gray-700 hover:bg-gray-100`} onClick={() => setIsMenuOpen(false)}>
              İletişim
            </Link>
            
            
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
