'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '../../store';
import { sendContactMessage, fetchContactInfo, clearError } from '../../store/slices/contactSlice';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  urgency: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: 'normal',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();
  const { isSending, error } = useAppSelector((state: RootState) => state.contact) as { isSending: boolean; error: string | null };

  useEffect(() => {
    dispatch(fetchContactInfo());
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    // Form validasyonu
    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType || !formData.message) {
      return;
    }

    try {
      const messageData = {
        ...formData,
        subject: `${formData.serviceType} - ${formData.urgency}`,
        priority: formData.urgency === 'cok-acil' ? 'high' as const : formData.urgency === 'acil' ? 'medium' as const : 'low' as const,
      };

      await dispatch(sendContactMessage(messageData)).unwrap();

      // Formu temizle
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        urgency: 'normal',
        message: ''
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Mesaj gönderilirken hata:', err);
      // Error is handled by Redux
    }
  };

  return (
    <div>
      {/* Hero Section with Background Image - Like Homepage */}
      <section className="relative py-32 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://www.bacanaklarvinc.com.tr/assets/img/sepetli-vinc/43metre-sepetli-vinc-1.jpg"
            alt="İletişim Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+JNwTLI5xY/wAk/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwUG/9oACAEBAwE/AMZb3X7f/9k="
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            İletişime <span className="text-amber-400">Geçin</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Tesisat sorunlarınız için uzman ekibimizle iletişime geçin. 
            7/24 hizmetinizdeyiz!
          </p>
        </div>
      </section>

      {/* Contact Form and Map Section - Side by Side */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mesaj Gönderin
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tesisat sorunlarınızı çözmek için sadece bir adım uzaktayız.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-50 rounded-full opacity-70 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-50 rounded-full opacity-70 z-0"></div>
              
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 relative z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-2xl"></div>
                
                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="Telefon numaranız"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="E-posta adresiniz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hizmet Türü *
                    </label>
                    <select 
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Hizmet seçiniz</option>
                      <option value="su-tesisati">Kanalizasyon</option>
                      <option value="isitma-sistemi">Isıtma Sistemi</option>
                      <option value="banyo-mutfak">Banyo & Mutfak</option>
                      <option value="acil-servis">Acil Servis</option>
                      <option value="yeni-tesisat">Yeni Tesisat</option>
                      <option value="bakim-onarim">Bakım & Onarım</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aciliyet Durumu
                    </label>
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 hover:text-amber-600 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          value="normal" 
                          checked={formData.urgency === 'normal'}
                          onChange={handleInputChange}
                          className="text-amber-600" 
                        />
                        <span className="text-gray-700">Normal</span>
                      </label>
                      <label className="flex items-center gap-2 hover:text-amber-600 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          value="acil" 
                          checked={formData.urgency === 'acil'}
                          onChange={handleInputChange}
                          className="text-amber-600" 
                        />
                        <span className="text-gray-700">Acil</span>
                      </label>
                      <label className="flex items-center gap-2 hover:text-amber-600 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          value="cok-acil" 
                          checked={formData.urgency === 'cok-acil'}
                          onChange={handleInputChange}
                          className="text-amber-600" 
                        />
                        <span className="text-gray-700">Çok Acil</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Sorununuzu detaylı olarak açıklayın, adres bilgisi ekleyin..."
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      required
                      className="text-amber-600 rounded focus:ring-amber-500"
                    />
                    <label className="text-sm text-gray-600">
                      <a href="#" className="text-amber-600 hover:underline">Gizlilik Politikası</a>&apos;nı ve{' '}
                      <a href="#" className="text-amber-600 hover:underline">Kullanım Şartları</a>&apos;nı kabul ediyorum
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isSending ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Gönderiliyor...
                      </div>
                    ) : (
                      'Mesaj Gönder'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Konumumuz
              </h3>
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-96 border border-gray-100">
                <iframe
                  src="https://www.google.com/maps?q=Bulgurlu%2C%20S%C3%B6%C4%9F%C3%BCtl%C3%BC%20%C3%87ay%C4%B1r%20Cd.%20No%3A25%2C%2034696%20%C3%9Csk%C3%BCdar%2F%C4%B0stanbul&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Miran Vinc Konum"
                ></iframe>
              </div>
              
              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Hızlı Servis</p>
                    <p className="text-gray-600 text-sm"> Her zaman yanınızda</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Çalışma Saatleri</p>
                    <p className="text-gray-600 text-sm"> 7/24 Hizmet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Contact Info Below Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              İletişim Bilgileri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Size en hızlı şekilde ulaşabilmemiz için tüm iletişim kanallarımız açık.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">7/24 Acil Servis</h3>
              <p className="text-amber-600 font-bold text-lg">+90 532 699 15 52</p>
              <p className="text-gray-500 text-sm">7/24 hizmetinizdeyiz</p>
            </div>
            
            {/* Email */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta</h3>
              <p className="text-amber-600 font-semibold">info@miranvinc.com</p>
              <p className="text-gray-500 text-sm">Hızlı yanıt garantisi</p>
            </div>
            
            {/* Address */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adres</h3>
              <p className="text-gray-600 text-sm">
                Bulgurlu, Söğütlü Çayır Cd. No:25<br />
                34696 Üsküdar/İstanbul
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
