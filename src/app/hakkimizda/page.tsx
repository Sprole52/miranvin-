import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section - Keeping the original */}
      <section className="relative py-32 text-white">
        <div className="absolute inset-0">
          <Image
            src="/img/sayfa1.jpg"
            alt="Sepetli Vinc Hakkımızda Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-8">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-5xl font-light text-white mb-6 leading-tight tracking-tight">
            <span className="font-medium text-yellow-400">Hakkımızda</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            15 yıllık deneyimimizle İstanbul&apos;da güvenilir sepetli vinc hizmetleri sunuyoruz.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Story */}
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-8">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
                <span className="font-medium text-yellow-600">Sepetli Vinc</span> Hikayemiz
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                2008 yılında küçük bir işlikte başlayan hikayemiz, bugün İstanbul&apos;un 
                en güvenilir sepetli vinc firmaları arasında yer almamızla devam ediyor. 
                Kurucumuz &quot;kaliteli hizmet, güvenli çalışma&quot; mottosuyla 
                başladığımız bu yolculukta, her geçen gün daha da büyüdük.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Bugün 12 kişilik uzman ekibimizle, modern sepetli vinc ekipmanlarını geleneksel 
                ustalıkla birleştirerek, İstanbul&apos;un dört bir yanında hizmet veriyoruz. 
                Müşteri memnuniyeti odaklı yaklaşımımız ve güvenli işçiliğimizle 
                sektörde fark yaratmaya devam ediyoruz.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <div className="text-2xl font-bold text-yellow-600">300+</div>
                  <p className="text-gray-600 text-sm">Mutlu Müşteri</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <div className="text-2xl font-bold text-yellow-600">800+</div>
                  <p className="text-gray-600 text-sm">Tamamlanan Proje</p>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl transform rotate-1"></div>
              <Image
                src="/img/sayfa2.jpg"
                alt="Sepetli Vinc Ekibimiz"
                width={800}
                height={600}
                className="relative z-10 rounded-3xl shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-black p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm font-medium">Yıl Deneyim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-gray-600 text-lg">Farkımızı ortaya koyan özelliklerimiz</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Güvenlik Önceliği</h3>
              <p className="text-gray-600">Tüm çalışmalarımızda en yüksek güvenlik standartlarını uyguluyoruz.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hızlı Müdahale</h3>
              <p className="text-gray-600">Acil durumlarınızda en kısa sürede müdahale ediyoruz.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kalite Garantisi</h3>
              <p className="text-gray-600">Her işimizde en yüksek kalite standartlarını garanti ediyoruz.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
