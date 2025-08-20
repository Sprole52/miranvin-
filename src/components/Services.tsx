'use client'
import React from 'react';
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      icon: "🏗️",
      title: "İNŞAAT VİNC",
      description: "Bina inşaatlarında yük taşıma, malzeme nakli ve montaj işleri için profesyonel sepetli vinc hizmetleri sunuyoruz.",
      accentColor: "bg-yellow-500",
      slug: "insaat-vinc"
    },
    {
      icon: "🔧",
      title: "BAKIM & ONARIM",
      description: "Yüksek binalarda bakım, onarım ve temizlik işlerinde güvenli sepetli vinc kullanımı ile kaliteli hizmet.",
      accentColor: "bg-black",
      slug: "bakim-onarim"
    },
    {
      icon: "🎨",
      title: "CEPHE İŞLERİ",
      description: "Bina cephe boyama, kaplama ve dış cephe bakım işlerinde uzman ekibimizle profesyonel çözümler.",
      accentColor: "bg-yellow-500",
      slug: "cephe-isleri"
    },
    {
      icon: "⚡",
      title: "ACİL SERVİS",
      description: "7/24 acil durumlarda sepetli vinc hizmeti. Hızlı müdahale garantisi ile güvenilir çözümler.",
      accentColor: "bg-black",
      slug: "acil-servis"
    }
  ];

  return (
    <section id="hizmetler" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 text-yellow-600 text-sm font-semibold mb-6 px-6 py-3 bg-yellow-50 rounded-full border border-yellow-200">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-sm">PROFESYONEL HİZMETLER</span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          </div>
          <h2 className="text-4xl md:text-4xl font-black text-gray-900 mb-8 uppercase tracking-wider">
            Sepetli Vinc <span className="text-yellow-500">Hizmetlerimiz</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            İnşaat ve bakım projelerinizde güvenilir, kaliteli ve profesyonel sepetli vinc çözümleri sunuyoruz.
          </p>
        </div>

        {/* Services Grid - 4 Cards in a Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={index}
              className="text-center group relative"
            >
              {/* Premium Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100 group-hover:border-yellow-200"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl flex items-center justify-center group-hover:from-yellow-100 group-hover:to-yellow-200 transition-all duration-500 shadow-lg group-hover:shadow-xl border border-yellow-200">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{service.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-wider">
                  {service.title}
                </h3>

                {/* Accent Line */}
                <div className={`w-16 h-1.5 mx-auto mb-6 ${service.accentColor} rounded-full shadow-sm`}></div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm mb-8">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-8">
                  <Link 
                    href={`/hizmetlerimiz/${service.slug}`} 
                    className="inline-flex items-center text-gray-800 hover:text-yellow-600 font-semibold text-sm transition-all duration-300 group-hover:scale-105"
                  >
                    Detayları Gör
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-black text-black mb-6">Özel Projeleriniz İçin</h3>
            <p className="text-lg text-black/80 mb-10 max-w-3xl mx-auto font-medium">
              Büyük ölçekli projelerinizde özel sepetli vinc çözümleri sunuyoruz. 
              Profesyonel ekibimizle her detayı planlıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/iletisim"
                className="inline-flex items-center bg-black text-yellow-400 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Teklif Al
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/hizmetlerimiz"
                className="inline-flex items-center border-2 border-black text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black hover:text-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                Tüm Hizmetler
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
