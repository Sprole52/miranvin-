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

  // Mobile menu scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll
      document.body.style.overflow = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Admin sayfasında Header'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
                alt="Miran Vinc Logo"
                width={200}
                height={60}
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
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
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 my-1 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Full screen overlay for all content - covers entire viewport */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-40 z-[9997] lg:hidden"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                minHeight: '100vh'
              }}
            />
            
            {/* Backdrop - Clickable overlay */}
            <div 
              className="fixed inset-0 bg-transparent z-[9998] lg:hidden"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                minHeight: '100vh'
              }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content - Full height right side */}
            <div 
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[9999] lg:hidden transform transition-transform duration-300 ease-out"
              style={{ 
                position: 'fixed', 
                top: 0, 
                right: 0, 
                height: '100vh', 
                width: '320px', 
                zIndex: 9999,
                minHeight: '100vh'
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                   
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Close mobile menu"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-6">
                  <div className="space-y-3">
                    <Link 
                      href="/" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Ana Sayfa
                    </Link>
                    <Link 
                      href="/hizmetlerimiz" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Hizmetlerimiz
                    </Link>
                    <Link 
                      href="/hizmet-bolgelerimiz" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Hizmet Bölgelerimiz
                    </Link>
                    <Link 
                      href="/galeri" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Galeri
                    </Link>
                    <Link 
                      href="/haberler" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Haberler
                    </Link>
                    <Link 
                      href="/hakkimizda" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Hakkımızda
                    </Link>
                    <Link 
                      href="/iletisim" 
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      İletişim
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;