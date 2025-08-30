import React from 'react';
import Link from 'next/link';

const Contact = () => {
  return (
    <section id="iletisim" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            İletişime <span className="text-yellow-600">Geçin</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sepetli vinc ihtiyaçlarınız için uzman ekibimizle iletişime geçin
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Phone */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Telefon</h3>
            <a 
              href="tel:+905326991552"
              className="text-xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              +90 532 699 15 52
            </a>
            <p className="text-gray-500 text-sm mt-1">7/24 hizmetinizdeyiz</p>
          </div>
          
          {/* Email */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">E-posta</h3>
            <a 
              href="mailto:info@miranvinc.com"
              className="text-lg text-yellow-600 hover:text-yellow-700 transition-colors break-all"
            >
              info@miranvinc.com
            </a>
            <p className="text-gray-500 text-sm mt-1">Hızlı yanıt garantisi</p>
          </div>
          
          {/* Address */}
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Adres</h3>
            <p className="text-lg text-gray-900">
              Bulgurlu, Söğütlü Çayır Cd. No:25<br />
              34696 Üsküdar/İstanbul
            </p>
            <p className="text-gray-500 text-sm mt-1">Merkezi konum</p>
          </div>
        </div>

       

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detaylı İletişim Formu</h3>
            <p className="text-gray-600 mb-6">
              Proje detaylarınızı paylaşın, size özel teklif hazırlayalım
            </p>
            <Link 
              href="/iletisim"
              className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Formu Doldur
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
