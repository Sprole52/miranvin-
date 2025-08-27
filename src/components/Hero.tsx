'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hooks';
import { incrementCallCounter } from '@/store/slices/contactSlice';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useAppDispatch();
  
  const slides = [
    {
      src: "/img/adalar-sepetli-vinc.jpg",
      alt: "Adalar Sepetli Vinc Hizmetleri"
    },
    {
      src: "/img/vinc1.jpg",
      alt: "Sepetli Vinc Platform Aracı"
    },
    {
      src: "/img/vinc2.jpeg",
      alt: "Vinc Hizmetleri"
    },
    {
      src: "/img/vinc3.jpeg",
      alt: "Vinc Kontrol ve Bakım"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(interval);
  }, [slides.length]);



  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCallClick = () => {
    // Call counter'ı artır
    dispatch(incrementCallCounter());
  };

  return (
    <section className="relative text-white min-h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-80' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              quality={85}
            />
          </div>
        ))}
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Circuit board pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Slider Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-orange-500 scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Left side - Text Content */}
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                <span className="text-white block">PROFESYONEL</span>
                <span className="text-orange-500 font-black block">SEPETLİ VİNC</span>
                <span className="text-white block">HİZMETLERİ</span>
                <span className="text-white block">7/24 YANINIZDAYIZ</span>
              </h1>
            </div>
            
            <p className="text-base md:text-lg mb-8 font-medium text-gray-300 max-w-2xl leading-relaxed">
              İnşaat, bakım, onarım ve yük taşıma işlerinizde güvenilir ve kaliteli sepetli vinc hizmetleri. Deneyimli ekibimizle her projede yanınızdayız.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
             
              
              <a 
                href="tel:+905555555555" 
                onClick={handleCallClick}
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-6 rounded-lg text-base transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/50"
              >
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Ara
              </a>

              <a 
                href="https://wa.me/905555555555" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-6 rounded-lg text-base transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/50"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;