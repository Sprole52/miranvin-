'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      src: "/img/adalar-sepetli-vinc.jpg",
      alt: "Adalar Sepetli Vinc Hizmetleri"
    },
    {
      src: "/img/gider.jpg",
      alt: "Sepetli Vinc Platform Aracı"
    },
    {
      src: "/img/slider.jpg",
      alt: "Vinc Hizmetleri"
    },
    {
      src: "/img/kontrol.jpg",
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
              <button className="bg-transparent border-2 border-orange-500 text-white font-bold py-3 px-6 rounded-lg text-base hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group">
                <svg className="w-4 h-4 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Teklif Al
              </button>
              <button className="bg-transparent border-2 border-orange-500 text-white font-bold py-3 px-6 rounded-lg text-base hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group">
                <svg className="w-4 h-4 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
                Hizmetlerimiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;