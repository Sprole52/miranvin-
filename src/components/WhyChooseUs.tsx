import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WhyChooseUs = () => {
  return (
    <section id="hakkimizda" className="py-24 bg-gradient-to-br from-gray-50 via-white to-yellow-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full border border-yellow-200">
              Sepetli Vinc Uzmanları
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Neden <span className="text-yellow-600">Bizi</span> Seçmelisiniz?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sepetli vinc sektöründe 15 yılı aşkın deneyimimizle güvenilir, kaliteli ve hızlı hizmet sunuyoruz. 
            Tüm işlerimizde güvenlik standartlarına uygun çalışıyor, müşteri memnuniyetini ön planda tutuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Content & Benefits */}
          <div className="order-2 lg:order-1">
            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">15+ Yıl Deneyim</h3>
                    <p className="text-sm text-gray-600">Sektörde uzun yıllar</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">7/24 Hizmet</h3>
                    <p className="text-sm text-gray-600">Her zaman yanınızdayız</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Güvenlik Odaklı</h3>
                    <p className="text-sm text-gray-600">En yüksek standartlar</p>
                  </div>
                </div>
              </div>

              <div className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Uzman Ekip</h3>
                    <p className="text-sm text-gray-600">Sertifikalı operatörler</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-200/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Daha Detaylı Bilgi</h3>
                  <p className="text-gray-600 text-sm">Şirketimiz hakkında detaylı bilgi alın</p>
                </div>
                <Link 
                  href="/hakkimizda"
                  className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Hakkımızda
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-3xl transform -rotate-2"></div>
              
              {/* Main Image */}
              <div className="relative z-10">
                <Image 
                  src="/img/sayfa1.jpg"
                  alt="Profesyonel Sepetli Vinc Ekibi"
                  width={600}
                  height={500}
                  className="rounded-3xl shadow-2xl w-full h-auto object-cover"
                />
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">500+</div>
                    <div className="text-sm text-gray-600 font-medium">Mutlu Müşteri</div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">15+</div>
                    <div className="text-sm font-medium">Yıl</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
