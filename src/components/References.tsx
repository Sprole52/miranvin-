import React from 'react';
import Image from 'next/image';

const References = () => {
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
    <section id="referanslar" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Müşteri Yorumları
          </h2>
          <p className="text-base sm:text-md md:text-lg text-gray-600 max-w-xl mx-auto px-4 sm:px-0">
            Müşterilerimizin memnuniyeti bizim en büyük başarımızdır.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {references.map((ref, index) => (
            <div key={index} className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <Image 
                  src={ref.image} 
                  alt={ref.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mr-2 sm:mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{ref.name}</h4>
                  <p className="text-xs text-gray-600">{ref.company}</p>
                  <p className="text-xs text-gray-500">{ref.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(ref.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xs sm:text-sm">⭐</span>
                ))}
              </div>
              
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                &quot;{ref.comment}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">300+</div>
              <p className="text-xs sm:text-sm text-gray-600">Tamamlanan Proje</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">500+</div>
              <p className="text-xs sm:text-sm text-gray-600">Mutlu Müşteri</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">15+</div>
              <p className="text-xs sm:text-sm text-gray-600">Yıl Deneyim</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1 sm:mb-2">24/7</div>
              <p className="text-xs sm:text-sm text-gray-600">Hizmet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
