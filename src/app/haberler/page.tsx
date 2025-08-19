'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

interface Haber {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const NewsPage = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Newsletter subscription states
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news from Firestore
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        // Filter active news and sort by order
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setHaberler(activeNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get all unique tags from news
  const allTags = Array.from(new Set(haberler.flatMap(haber => haber.tags || [])));

  // Get featured news (should be only 1)
  const featuredNews = haberler.filter(haber => haber.featured).slice(0, 1);
  
  // Get other news (non-featured) for pagination
  const otherNews = haberler.filter(haber => !haber.featured);
  
  // Calculate pagination
  const totalPages = Math.ceil(otherNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = otherNews.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle newsletter subscription
  const handleNewsletterSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    try {
      setIsSubscribing(true);
      setSubscriptionStatus('idle');
      setSubscriptionMessage('');

      // Add to Firestore
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email: email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
        isActive: true,
        source: 'haberler_sayfasi'
      });

      setSubscriptionStatus('success');
      setSubscriptionMessage('E-posta adresiniz başarıyla kaydedildi! Teşekkürler.');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setSubscriptionMessage('');
      }, 5000);

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionStatus('error');
      setSubscriptionMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Haberler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://www.bacanaklarvinc.com.tr/assets/img/sepetli-vinc/43metre-sepetli-vinc-1.jpg")'
          }}
        />
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-amber-400">Haberler</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Tesisat dünyasından güncel haberler, ipuçları ve faydalı bilgiler.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-2xl font-bold text-amber-300">{haberler.length}</div>
              <div className="text-sm text-amber-100">Toplam Haber</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-2xl font-bold text-amber-300">{allTags.length}</div>
              <div className="text-sm text-amber-100">Farklı Etiket</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-2xl font-bold text-amber-300">{featuredNews.length}</div>
              <div className="text-sm text-amber-100">Öne Çıkan</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tag Filter */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium mb-4">
              <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
              <span>GÜNCEL HABERLERİMİZ</span>
              <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Blog & Haberler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Tesisat dünyasından en güncel haberler ve uzman önerilerini takip edin.
            </p>
          </div>

          {/* Featured Article */}
          {featuredNews.map((haber) => (
            <div key={haber.id} className="mb-16 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  {haber.imageUrl ? (
                    <Image
                      src={haber.imageUrl}
                      alt={haber.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-6xl text-gray-400">📰</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ ÖNE ÇIKAN
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
                    <span>•</span>
                  </div>
                  <Link href={`/haberler/${haber.id}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors cursor-pointer">
                      {haber.title}
                    </h3>
                  </Link>
                  {haber.subtitle && (
                    <p className="text-lg text-gray-600 mb-4">{haber.subtitle}</p>
                  )}
                  <div 
                    className="text-gray-600 leading-relaxed mb-6 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: haber.description }}
                  />
                  
                  {/* Tags */}
                  {haber.tags && haber.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {haber.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link 
                    href={`/haberler/${haber.id}`}
                    className="self-start bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Devamını Oku
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Other Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNews.map((haber) => (
              <article
                key={haber.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {haber.imageUrl ? (
                    <Image
                      src={haber.imageUrl}
                      alt={haber.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-4xl text-gray-400">📰</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
                    <span>•</span>
                  </div>
                  <Link href={`/haberler/${haber.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-amber-600 transition-colors cursor-pointer">
                      {haber.title}
                    </h3>
                  </Link>
                  {haber.subtitle && (
                    <p className="text-sm text-gray-600 mb-2 font-medium">{haber.subtitle}</p>
                  )}
                  <div 
                    className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: haber.description }}
                  />
                  
                  {/* Tags */}
                  {haber.tags && haber.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {haber.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {haber.tags.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{haber.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <Link 
                    href={`/haberler/${haber.id}`}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors flex items-center gap-1"
                  >
                    Devamını Oku
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}

          {otherNews.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz haber eklenmemiş</h3>
              <p className="text-gray-500">
                Yakında güzel haberlerimizi görebileceksiniz.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Haber Bültenimize Abone Olun
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Tesisat dünyasından en son haberler, ipuçları ve özel indirimlerden haberdar olmak için 
              e-posta adresinizi bırakın.
            </p>
            
            <form onSubmit={handleNewsletterSubscription} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Kaydediliyor...' : 'Abone Ol'}
                </button>
              </div>
              
              {/* Status Messages */}
              {subscriptionMessage && (
                <div className={`max-w-md mx-auto p-3 rounded-lg text-sm ${
                  subscriptionStatus === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {subscriptionMessage}
                </div>
              )}
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              İstediğiniz zaman abonelikten çıkabilirsiniz. Gizlilik politikamızı okuyun.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
