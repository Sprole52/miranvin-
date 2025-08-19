import React from 'react';
import Link from 'next/link';

const Contact = () => {
  return (
    <section id="iletisim" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-8">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Hemen <span className="font-medium text-yellow-600">İletişime</span> Geçin
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sepetli vinc ihtiyaçlarınız için uzman ekibimizle iletişime geçin. 
            7/24 hizmetinizdeyiz!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Phone Card */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-xl mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">7/24 Acil Servis</h3>
            <a 
              href="tel:+905327899182"
              className="text-xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors duration-200 block"
            >
              +90 532 789 91 82
            </a>
            <p className="text-gray-500 mt-2 text-sm">Her zaman ulaşabilirsiniz</p>
          </div>
          
          {/* Email Card */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-xl mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta</h3>
            <a 
              href="mailto:info@sepetlivinc.com"
              className="text-base font-semibold text-yellow-600 hover:text-yellow-700 transition-colors duration-200 block break-all"
            >
              info@sepetlivinc.com
            </a>
            <p className="text-gray-500 mt-2 text-sm">Hızlı yanıt garantisi</p>
          </div>
          
          {/* Address Card */}
          <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/10 rounded-xl mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Adres</h3>
            <p className="text-base text-gray-600 mb-1">Kadıköy, İstanbul</p>
            <p className="text-gray-500 text-sm">Merkezi konum</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl p-16 shadow-xl">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-light text-black mb-6">Detaylı İletişim Formu</h3>
              <p className="text-black/80 mb-10 text-lg">
                Proje detaylarınızı paylaşın, size özel teklif hazırlayalım.
              </p>
              <Link 
                href="/iletisim"
                className="inline-flex items-center justify-center px-10 py-4 bg-black text-yellow-400 rounded-2xl font-medium hover:bg-gray-900 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Formu Doldur
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
