'use client'
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "7/24 acil servis hizmeti veriyor musunuz?",
      answer: "Evet, 7 gün 24 saat acil sepetli vinc hizmeti veriyoruz. Acil durumlarınızda hemen bizi arayabilirsiniz."
    },
    {
      question: "Sepetli vinc işlerinizde güvenlik nasıl sağlanıyor?",
      answer: "Tüm işlerimizde güvenlik standartlarına tam uyum sağlıyoruz. Operatörlerimiz sertifikalı, ekipmanlarımız düzenli kontrol ediliyor ve iş güvenliği protokollerine uygun çalışıyoruz."
    },
    {
      question: "Fiyat teklifi almak için ne yapmam gerekiyor?",
      answer: "Keşif ve fiyat teklifi için bizi arayabilir veya iletişim formundan mesaj gönderebilirsiniz. Uzman ekibimiz gelip işi yerinde inceleyerek size detaylı fiyat teklifi sunar."
    },
    {
      question: "Hangi bölgelerde hizmet veriyorsunuz?",
      answer: "İstanbul'un tüm ilçelerinde sepetli vinc hizmeti veriyoruz. Özellikle Anadolu yakasında (Kadıköy, Üsküdar, Maltepe, Kartal) daha hızlı müdahale edebiliyoruz."
    },
    {
      question: "Sepetli vinc operatörleri sertifikalı mı?",
      answer: "Evet, tüm operatörlerimiz gerekli sertifikalara sahip ve düzenli eğitim alıyor. Güvenlik bizim önceliğimizdir."
    },
    {
      question: "Yüksek binalarda çalışma yapabiliyor musunuz?",
      answer: "Evet, yüksek binalarda bakım, onarım, cephe boyama gibi işlerde sepetli vinc kullanarak güvenli çalışma yapabiliyoruz. Maksimum yükseklik sınırımız 50 metre."
    },
    {
      question: "Endüstriyel tesislerde hizmet veriyor musunuz?",
      answer: "Evet, fabrika, depo ve endüstriyel tesislerde sepetli vinc hizmetleri sunuyoruz. Her türlü endüstriyel projede çalışabiliyoruz."
    },
    {
      question: "Ödeme nasıl yapabilirim?",
      answer: "Nakit, kredi kartı (taksitli), banka kartı ve havale ile ödeme kabul ediyoruz. İş tamamlandıktan sonra ödeme alıyoruz. Büyük projeler için peşin indirim uyguluyoruz."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-2xl mb-8">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Sık Sorulan <span className="font-medium text-yellow-600">Sorular</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Müşterilerimizin en sık sorduğu soruları ve yanıtlarını derledik. 
            Aradığınız cevabı bulamıyorsanız bizimle iletişime geçin.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-8 text-left focus:outline-none focus:ring-0"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-yellow-700 transition-colors duration-200 pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className={`w-6 h-6 transition-all duration-300 ease-out ${
                      activeIndex === index 
                        ? 'rotate-45 text-yellow-600' 
                        : 'text-gray-400 group-hover:text-yellow-500'
                    }`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-out ${
                activeIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8">
                  <div className="pt-0 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-6 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
