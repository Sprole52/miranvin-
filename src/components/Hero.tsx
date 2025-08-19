import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative text-white h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Optimized */}
      <div className="absolute inset-0">
        <Image
          src="/img/slider.jpg"
          alt="Sepetli Vinc Hizmetleri Arka Plan"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+JNwTLI5xY/wAk/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwUG/9oACAEBAwE/AMZb3X7f/9k="
         
        />
      </div>
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/40 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center sm:text-left">
          <div className="mb-4 sm:mb-6">
            <span className="bg-yellow-500 text-black px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg">
              Profesyonel Vinc Hizmetleri
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-white block sm:inline">Güvenilir</span>
            <br className="hidden sm:block" />
            <span className="text-yellow-400 font-black block sm:inline">Sepetli Vinc</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-medium text-gray-200 max-w-lg mx-auto sm:mx-0 leading-relaxed">
            İnşaat, bakım, onarım ve yük taşıma işlerinizde profesyonel sepetli vinc hizmetleri. 7/24 yanınızdayız.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
            <button className="bg-yellow-500 text-black font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg hover:bg-yellow-400 transition-all shadow-xl transform hover:scale-105 touch-button">
              Teklif Al
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg hover:bg-white hover:text-black transition-all touch-button">
              📞 7/24 Hizmet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;