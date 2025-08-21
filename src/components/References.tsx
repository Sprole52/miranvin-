'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const References = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    customers: 0,
    experience: 0,
    service: 0
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const targetCounts = {
    projects: 300,
    customers: 500,
    experience: 15,
    service: 24
  };

  const animateCount = (start: number, end: number, duration: number, callback: (value: number) => void) => {
    const startTime = performance.now();
    
    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate each counter
            animateCount(0, targetCounts.projects, 2000, (value) => 
              setCounts(prev => ({ ...prev, projects: value }))
            );
            
            animateCount(0, targetCounts.customers, 2000, (value) => 
              setCounts(prev => ({ ...prev, customers: value }))
            );
            
            animateCount(0, targetCounts.experience, 2000, (value) => 
              setCounts(prev => ({ ...prev, experience: value }))
            );
            
            animateCount(0, targetCounts.service, 2000, (value) => 
              setCounts(prev => ({ ...prev, service: value }))
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetCounts.projects, targetCounts.customers, targetCounts.experience, targetCounts.service]);

  const references = [
    {
      name: "Ahmet Yılmaz",
      company: "İnşaat Firması Sahibi",
      location: "Kadıköy, İstanbul",
      rating: 5,
      comment: "Çok profesyonel bir ekip. Sepetli vinc hizmetlerinde çok hızlı ve güvenli çalışıyorlar. Kesinlikle tavsiye ederim!",
      image: "/img/ahmet.avif"
    },
    {
      name: "Banu Demirkul",
      company: "Bakım Firması",
      location: "Beşiktaş, İstanbul",
      rating: 5,
      comment: "Yüksek binalarda bakım işlerinde sepetli vinc kullanımı çok başarılı. 7/24 hizmet gerçekten çok değerli.",
      image: "/img/ayşe.avif"
    },
    {
      name: "Sevgi Kaya",
      company: "Apartman Yöneticisi",
      location: "Şişli, İstanbul",
      rating: 5,
      comment: "Apartmanımızda yapılan cephe boyama işleri çok kaliteli. Sepetli vinc ile güvenli çalışma yapıldı.",
      image: "/img/banu.avif"
    },
    {
      name: "Ali Öztürk",
      company: "Fabrika Sahibi",
      location: "Üsküdar, İstanbul",
      rating: 5,
      comment: "Endüstriyel tesisimizde vinc hizmetleri mükemmel. Güvenlik standartlarına tam uyum sağlıyorlar!",
      image: "/img/ali.avif"
    }
  ];

  return (
    <section id="referanslar" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Müşteri <span className="text-orange-600">Yorumları</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Güvenilir hizmetimiz ve kaliteli işçiliğimizle müşterilerimizin takdirini kazanıyoruz
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {references.map((ref, index) => (
            <div key={index} className="group relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-gray-50 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              
              {/* Main card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 w-8 h-8 text-orange-200">
                  <svg fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                  </svg>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(ref.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                
                {/* Comment */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{ref.comment}&rdquo;
                </p>
                
                {/* User info */}
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="relative">
                    <Image 
                      src={ref.image} 
                      alt={ref.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 text-base">{ref.name}</h4>
                    <p className="text-sm text-gray-600">{ref.company}</p>
                    <p className="text-sm text-orange-600 font-medium">{ref.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="bg-gray-50 p-4 sm:p-6 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">
                {counts.projects}+
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Tamamlanan Proje</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">
                {counts.customers}+
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Mutlu Müşteri</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">
                {counts.experience}+
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Yıl Deneyim</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">
                {counts.service}/7
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Hizmet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
