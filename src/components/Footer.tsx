'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  // Admin sayfasında Footer'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ana İçerik */}
        <div className="py-16">
          {/* Üst Kısım - Logo ve Açıklama */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Image 
                src="/logo.png"
                alt="Seka Altyapı Logo"
                width={160}
                height={50}
                className="h-10 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              İstanbul&apos;da profesyonel sepetli vinc ve altyapı hizmetleri. 7/24 yanınızdayız.
            </p>
          </div>

          {/* 4 Sütunlu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Sütun 1: Şirket */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-500 pb-2">
                Şirket
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/hakkimizda" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetlerimiz" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm">
                    Hizmetlerimiz
                  </Link>
                </li>
                <li>
                  <Link href="/galeri" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm">
                    Galeri
                  </Link>
                </li>
                <li>
                  <Link href="/haberler" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm">
                    Haberler
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sütun 2: Hizmetler */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-500 pb-2">
                Hizmetler
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-300 text-sm">
                  🏗️ Sepetli Vinc
                </li>
                <li className="text-gray-300 text-sm">
                  🚧 İnşaat Hizmetleri
                </li>
                <li className="text-gray-300 text-sm">
                  🔧 Bakım & Onarım
                </li>
                <li className="text-gray-300 text-sm">
                  📦 Yük Taşıma
                </li>
              </ul>
            </div>

            {/* Sütun 3: İletişim */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-500 pb-2">
                İletişim
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-300 text-sm">
                  📍 İstanbul, Türkiye
                </li>
                <li className="text-gray-300 text-sm">
                  📞 +90 532 789 91 82
                </li>
                <li className="text-gray-300 text-sm">
                  ✉️ info@sekaaltyapi.com
                </li>
                <li className="text-gray-300 text-sm">
                  🕒 7/24 Hizmet
                </li>
              </ul>
            </div>

            {/* Sütun 4: Bizi Takip Edin */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-500 pb-2">
                Bizi Takip Edin
              </h3>
              <div className="flex gap-3 justify-center lg:justify-start">
                <a 
                  href="https://wa.me/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
                  title="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
                
                <a 
                  href="tel:+905327899182" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
                  title="Telefon"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://instagram.com/tesisatpro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="/iletisim" 
                  className="w-10 h-10 bg-gray-800 hover:bg-amber-600 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
                  title="İletişim"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım - Copyright */}
        <div className="border-t border-gray-800 pt-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-amber-400 font-medium">Seka Altyapı</span>. 
                Tüm hakları saklıdır.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/hakkimizda" className="hover:text-amber-400 transition-colors duration-300">
                Gizlilik Politikası
              </Link>
              <Link href="/hizmetlerimiz" className="hover:text-amber-400 transition-colors duration-300">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
