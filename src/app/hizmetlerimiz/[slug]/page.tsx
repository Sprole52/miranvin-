import React from 'react';
import { notFound } from 'next/navigation';

// Services data - JSON'dan gelecek
const servicesData = {
  'kanalizasyon': {
    id: 'kanalizasyon',
    title: 'Kanalizasyon',
    icon: '🕳️',
    description: 'Kanalizasyon görüntüleme Ve Kanalizasyon açma işleriniz.',
    heroImage: '/img/tesisat.jpg',
    features: [
      'Su kaçağı tespiti ve onarımı',
      'Boru değişimi ve yenileme',
      'Musluk ve batarya montajı',
      'Su sayacı kurulumu',
      'Su basıncı ayarlama',
      'Su filtreleme sistemleri',
      'Sıhhi tesisat kurulumu',
      'Gider ve kanalizasyon işleri'
    ],
    detailedInfo: {
      overview: 'Kanalizasyon hizmetlerimiz, modern teknoloji ve 20 yıllık deneyimimizle evinizdeki tüm su ile ilgili sorunları çözmek üzere tasarlanmıştır.',
      whyChoose: [
        'Modern kaçak tespit cihazları kullanımı',
        'Orijinal ve kaliteli malzeme garantisi',
        'Minimum yıkım ile maksimum çözüm',
        '2 yıl işçilik garantisi',
        '7/24 acil müdahale hizmeti'
      ],
      process: [
        { step: 1, title: 'Keşif ve Tespit', description: 'Modern cihazlarla sorunun tespiti' },
        { step: 2, title: 'Çözüm Önerisi', description: 'En uygun çözüm ve fiyat teklifi' },
        { step: 3, title: 'Uygulama', description: 'Profesyonel ekiple hızlı çözüm' },
        { step: 4, title: 'Test ve Garanti', description: 'Kalite kontrolü ve garanti belgesi' }
      ]
    },
    gallery: [
      '/img/tesisat.jpg',
      '/img/gider.jpg',
      '/img/kontrol.jpg'
    ]
  },
  'kanalizasyon-tunel': {
    id: 'kanalizasyon-tunel',
    title: 'Kanalizasyon Tünel',
    icon: '👷🏼',
    description: 'Binanızın Altına Kanalizasyon Tünel Kazma İşleriniz',
    heroImage: '/img/tünel.jpg',
    features: [
      'Tünel kazma ve açma işleri',
      'Yeraltı kanalizasyon hattı',
      'Bina altı tünel projesi',
      'Kanalizasyon hattı döşeme',
      'Tünel güçlendirme işleri',
      'Yeraltı su yolu açma',
      'Tünel bakım ve onarım',
      'Kanalizasyon hattı kontrolü'
    ],
    detailedInfo: {
      overview: 'Kanalizasyon Tünel konusunda uzman ekibimizle, bina altı tünel kazma ve kanalizasyon hattı döşeme işlerini profesyonelce gerçekleştiriyoruz.',
      whyChoose: [
        'Deneyimli tünel kazma ekibi',
        'Modern kazma ekipmanları',
        'Güvenli tünel güçlendirme',
        'Proje bazlı çözümler',
        'Kaliteli malzeme kullanımı'
      ],
      process: [
        { step: 1, title: 'Yer Tespiti', description: 'Tünel kazılacak alanın belirlenmesi' },
        { step: 2, title: 'Proje Tasarımı', description: 'Tünel projesi ve güvenlik önlemleri' },
        { step: 3, title: 'Kazma İşlemi', description: 'Profesyonel ekipmanla güvenli kazma' },
        { step: 4, title: 'Hattın Döşenmesi', description: 'Kanalizasyon hattının kurulumu' }
      ]
    },
    gallery: [
      '/img/tünel.jpg',
      '/img/tesisat.jpg',
      '/img/kontrol.jpg'
    ]
  },
  'banyo-mutfak': {
    id: 'banyo-mutfak',
    title: 'Banyo & Mutfak',
    icon: '🚿',
    description: 'Banyo ve mutfak tesisatı, gider tıkanıklığı açma Hizmeti',
    heroImage: '/img/gider.jpg',
    features: [
      'Banyo tesisatı kurulumu',
      'Mutfak tesisatı düzenleme',
      'Gider tıkanıklığı açma',
      'Lavabo ve evye montajı',
      'Duşakabin kurulumu',
      'WC ve bidet montajı',
      'Banyo-mutfak tadilat tesisatı',
      'Sıcak su sistemi kurulumu'
    ],
    detailedInfo: {
      overview: 'Banyo ve mutfak alanlarınızın tesisat ihtiyaçlarını modern çözümlerle karşılıyor, yaşam kalitenizi artırıyoruz.',
      whyChoose: [
        'Hijyenik ve kaliteli malzemeler',
        'Su tasarrufu sağlayan sistemler',
        'Estetik ve fonksiyonel çözümler',
        'Hızlı kurulum ve minimum rahatsızlık',
        'Tadilat sonrası temizlik hizmeti'
      ],
      process: [
        { step: 1, title: 'Alan İnceleme', description: 'Mevcut durum ve ihtiyaç analizi' },
        { step: 2, title: 'Proje Tasarım', description: 'Fonksiyonel tasarım önerisi' },
        { step: 3, title: 'Malzeme Temin', description: 'Kaliteli malzeme temini' },
        { step: 4, title: 'Kurulum ve Son Test', description: 'Profesyonel montaj ve test' }
      ]
    },
    gallery: [
      '/img/gider.jpg',
      '/img/tesisat.jpg',
      '/img/kontrol.jpg'
    ]
  },
  'acil-servis': {
    id: 'acil-servis',
    title: 'Acil Servis',
    icon: '🔧',
    description: '7/24 acil tesisat arıza giderme, su kesintisi ve acil müdahale.',
    heroImage: '/img/acil.jpg',
    features: [
      '7/24 acil müdahale',
      'Su kesintisi çözümü',
      'Acil tesisat onarımı',
      'Gece müdahale hizmeti',
      'Hızlı sorun tespiti',
      'Geçici çözüm uygulama',
      'Acil kaçak tamiri',
      'Kombi acil arıza giderme'
    ],
    detailedInfo: {
      overview: 'Acil durumlarınızda 7/24 hizmetinizdeyiz. Deneyimli ekibimizle en kısa sürede müdahale eder, sorunlarınızı çözeriz.',
      whyChoose: [
        'Ortalama 30 dakika müdahale süresi',
        'Gece-gündüz fark etmez hizmet',
        'Acil durum için özel ekip',
        'Mobil servis aracı ile hızlı ulaşım',
        'Geçici çözümler ile anlık rahatlama'
      ],
      process: [
        { step: 1, title: 'Acil Çağrı', description: 'Size en yakın ekibimizi yönlendiriyoruz' },
        { step: 2, title: 'Hızlı Müdahale', description: '30 dakika içinde yerinde' },
        { step: 3, title: 'Sorun Tespiti', description: 'Hızlı tanı ve çözüm önerisi' },
        { step: 4, title: 'Anlık Çözüm', description: 'Mümkünse anında, değilse geçici çözüm' }
      ]
    },
    gallery: [
      '/img/acil.jpg',
      '/img/tesisat.jpg',
      '/img/kontrol.jpg'
    ]
  },
  'yeni-tesisat': {
    id: 'yeni-tesisat',
    title: 'Yeni Tesisat',
    icon: '🏠',
    description: 'Yeni bina tesisat kurulumu, proje tasarımı ve uygulama.',
    heroImage: '/img/sayfa1.jpg',
    features: [
      'Yeni bina tesisat projesi',
      'Tesisat sistem tasarımı',
      'Malzeme seçimi ve tedariki',
      'Profesyonel kurulum',
      'Test ve devreye alma',
      'Kullanım kılavuzu',
      'Belediye onay işlemleri',
      'İskan sonrası garanti hizmeti'
    ],
    detailedInfo: {
      overview: 'Yeni yapılar için sıfırdan tesisat projesi tasarlıyor, A\'dan Z\'ye tüm kurulum işlemlerini gerçekleştiriyoruz.',
      whyChoose: [
        'Mimari projeye uygun tasarım',
        'Enerji verimli sistem önerileri',
        'Belediye onayları dahil hizmet',
        'Uzun vadeli garanti sistemi',
        'İskan sonrası destek hizmeti'
      ],
      process: [
        { step: 1, title: 'Proje İnceleme', description: 'Mimari proje analizi ve sistem tasarımı' },
        { step: 2, title: 'Teknik Çizim', description: 'Detaylı tesisat projesi hazırlığı' },
        { step: 3, title: 'Malzeme ve Kurulum', description: 'Kaliteli malzeme temini ve kurulum' },
        { step: 4, title: 'Test ve Devreye Alma', description: 'Sistem testleri ve kullanıma hazırlama' }
      ]
    },
    gallery: [
      '/img/sayfa1.jpg',
      '/img/sayfa2.jpg',
      '/img/tesisat.jpg'
    ]
  },
  'tesisat-kontrolu': {
    id: 'tesisat-kontrolu',
    title: 'Tesisat Kontrolü',
    icon: '🔍',
    description: 'Detaylı tesisat kontrolü, raporlama ve önleyici bakım hizmetleri.',
    heroImage: '/img/kontrol.jpg',
    features: [
      'Detaylı tesisat kontrolü',
      'Arıza tespiti ve raporlama',
      'Önleyici bakım planı',
      'Enerji verimliliği analizi',
      'Güvenlik kontrolü',
      'Bakım takip sistemi',
      'Fotoğraflı detay raporu',
      'Uzun vadeli izleme'
    ],
    detailedInfo: {
      overview: 'Sistematik kontroller ile potansiyel sorunları önceden tespit ediyor, büyük arızaları önlüyoruz.',
      whyChoose: [
        'Detaylı fotoğraflı raporlama',
        'Preventif bakım programı',
        'Erken uyarı sistemi',
        'Enerji tasarruf önerileri',
        'Yıllık takip ve izleme'
      ],
      process: [
        { step: 1, title: 'Ön İnceleme', description: 'Sistem genel durumu değerlendirilir' },
        { step: 2, title: 'Detaylı Kontrol', description: 'Tüm bileşenler tek tek kontrol edilir' },
        { step: 3, title: 'Raporlama', description: 'Fotoğraflı detay raporu hazırlanır' },
        { step: 4, title: 'Öneri ve Takip', description: 'İyileştirme önerileri ve takip planı' }
      ]
    },
    gallery: [
      '/img/kontrol.jpg',
      '/img/tesisat.jpg',
      '/img/gider.jpg'
    ]
  }
};

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${service.heroImage}")`
          }}
        />
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">{service.icon}</span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-amber-400">{service.title}</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#iletisim-formu"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                📞 Hemen Teklif Al
              </a>
              <a
                href="tel:+905327899182"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center"
              >
                📱 Acil Ara: 0532 555 01 23
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Hizmet Detayları
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {service.detailedInfo.overview}
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Neden Bizi Tercih Etmelisiniz?
                </h3>
                <ul className="space-y-3">
                  {service.detailedInfo.whyChoose.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Hizmet Kapsamımız
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

 
    </div>
  );
}

// Generate static params for all services
export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}
