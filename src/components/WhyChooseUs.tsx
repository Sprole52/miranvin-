import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WhyChooseUs = () => {
  return (
    <section id="hakkimizda" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Small Label */}
            <div className="mb-4">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Sepetli Vinc
              </span>
            </div>
            
           
            
            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
              NEDEN BİZİ SEÇMELİSİNİZ?
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Sepetli vinc sektöründe 15 yılı aşkın deneyimimizle güvenilir, kaliteli ve hızlı hizmet sunuyoruz. 
              Tüm işlerimizde güvenlik standartlarına uygun çalışıyor, müşteri memnuniyetini ön planda tutuyoruz. 
              Sertifikalı operatörlerimiz ve modern ekipmanlarımızla her projede en iyi sonucu elde ediyoruz.
            </p>
            
            {/* Read More Link */}
            <div className="mb-10">
              <Link 
                href="/hakkimizda"
                className="inline-block text-yellow-600 hover:text-yellow-700 font-medium text-sm underline underline-offset-4 transition-colors duration-300"
              >
                daha fazla oku
              </Link>
            </div>
            
            {/* Key Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">15+ Yıl Deneyim</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">7/24 Hizmet</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Güvenlik Odaklı</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Uzman Ekip</span>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Subtle background accent */}
              <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl transform rotate-1"></div>
              
              {/* Main Image */}
              <Image 
                src="/img/sayfa1.jpg"
                alt="Profesyonel Sepetli Vinc Ekibi"
                width={600}
                height={500}
                className="relative z-10 rounded-3xl shadow-xl w-full h-auto object-cover"
              />
              
              {/* Floating accent element */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
