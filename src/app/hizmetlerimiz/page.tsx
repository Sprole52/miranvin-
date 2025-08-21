import React from 'react';
import Image from 'next/image';

const ServicesPage = () => {
  const services = [
    {
      icon: "🏗️",
      title: "Yüksek Bina Bakımı",
      description: "Yüksek binalarda cephe temizliği, boyama ve bakım işleriniz için sepetli vinc hizmeti.",
      features: [
        "Cephe Temizliği",
        "Dış Cephe Boyama",
        "Cam Temizliği",
        "Bakım ve Onarım"
      ],
      image: "/img/vinc2.jpeg"
    },
    {
      icon: "🏭",
      title: "Endüstriyel Tesisler",
      description: "Fabrika, depo ve endüstriyel tesislerde sepetli vinc ile bakım ve onarım hizmetleri.",
      features: [
        "Fabrika Bakımı",
        "Depo Onarımı",
        "Endüstriyel Ekipman",
        "Tesis Bakımı"
      ],
      image: "/img/vinc2.jpeg"
    },
    {
      icon: "🚧",
      title: "İnşaat Projeleri",
      description: "İnşaat sahalarında sepetli vinc ile yükseklik gerektiren işler ve montaj hizmetleri.",
      features: [
        "Yükseklik İşleri",
        "Montaj Hizmetleri",
        "İnşaat Yardımı",
        "Proje Desteği"
      ],
      image: "/img/vinc2.jpeg"
    },
    {
      icon: "🔧",
      title: "Acil Servis",
      description: "7/24 acil sepetli vinc hizmeti, acil müdahale ve hızlı çözüm.",
      features: [
        "7/24 Acil Müdahale",
        "Hızlı Erişim",
        "Acil Onarım",
        "Gece Hizmeti"
      ],
      image: "/img/vinc2.jpeg"
    },
    {
      icon: "🎨",
      title: "Cephe ve Boya",
      description: "Bina cephelerinde boya, kaplama ve dekoratif işler için sepetli vinc hizmeti.",
      features: [
        "Cephe Boyama",
        "Kaplama İşleri",
        "Dekoratif Uygulamalar",
        "Renk Değişimi"
      ],
        image: "/img/vinc2.jpeg"
    },
    {
      icon: "🔍",
      title: "Kontrol ve Bakım",
      description: "Yükseklik gerektiren alanlarda detaylı kontrol, bakım ve raporlama hizmetleri.",
      features: [
        "Yükseklik Kontrolü",
        "Detaylı Bakım",
        "Arıza Tespiti",
        "Güvenlik Kontrolü"
      ],
      image: "/img/vinc2.jpeg"
    }
  ];

  return (
    <div>
      {/* Hero Section - Keeping the original */}
      <section className="relative py-32 text-white">
        <div className="absolute inset-0">
          <Image
            src="/img/vinc3.jpeg"
            alt="Sepetli Vinc Hizmetlerimiz Arka Plan"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-5xl font-light text-white mb-6 leading-tight tracking-tight">
            <span className="font-medium text-yellow-400">Sepetli Vinc</span> Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Profesyonel ekibimizle yükseklik gerektiren işlerinizde güvenli ve kaliteli sepetli vinc hizmeti sunuyoruz.
          </p>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-gray-600 text-lg">Yükseklik gerektiren her türlü işinizde sepetli vinc hizmeti veriyoruz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-yellow-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 text-3xl">{service.icon}</div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="/iletisim"
                    className="inline-flex items-center justify-center w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-2xl font-medium transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    İletişime Geç
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-gray-600 text-lg">Farkımızı ortaya koyan özelliklerimiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">15+ Yıl Deneyim</h3>
              <p className="text-gray-600">Sektörde 15 yılı aşkın deneyimimizle her türlü yükseklik işini güvenle çözüyoruz.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7/24 Acil Hizmet</h3>
              <p className="text-gray-600">Acil durumlarınızda 7/24 yanınızdayız. Gece gündüz demeden sepetli vinc hizmeti veriyoruz.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Güvenlik Odaklı</h3>
              <p className="text-gray-600">Tüm işlerimizde güvenlik standartlarına uygun çalışıyor, sertifikalı operatörler kullanıyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-white mb-6">Hemen Teklif Alın</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Sepetli vinc ihtiyaçlarınız için uzman ekibimizle iletişime geçin
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-yellow-600 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              İletişime Geçin
            </a>
            <a 
              href="/galeri"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-yellow-600 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Çalışmalarımızı Görün
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
