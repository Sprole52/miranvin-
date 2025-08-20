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
  const itemsPerPage = 9;
  
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Haberler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://www.bacanaklarvinc.com.tr/assets/img/sepetli-vinc/43metre-sepetli-vinc-1.jpg"
            alt="Haberler Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
        
        {/* Simple overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-yellow-400">Haberler</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Sepetli vinc sektöründen güncel haberler ve teknik bilgiler
          </p>
        </div>
      </section>

   

      {/* News Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* News Grid */}
          {currentNews.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz haber eklenmemiş</h3>
              <p className="text-gray-500">
                Yakında güzel haberlerimizi görebileceksiniz.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Header Section - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Öne Çıkan Haber
                  </h2>
                  <p className="text-gray-600">
                    En önemli ve dikkat çekici içerik
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Güncel Haberler
                  </h2>
                  <p className="text-gray-600">
                    Sepetli vinc sektöründen en son gelişmeler
                  </p>
                </div>
              </div>

              {/* Divider Line */}
              <div className="border-b border-gray-200"></div>

              {/* News Grid - First row with 2 items, others with 3 */}
              <div className="space-y-8">
                {/* First Row - 2 Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentNews.slice(0, 2).map((haber, index) => (
                    <article
                      key={haber.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        {haber.imageUrl ? (
                          <Image
                            src={haber.imageUrl}
                            alt={haber.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-6xl text-gray-400">📰</span>
                          </div>
                        )}
                        
                        {/* Featured Badge for first article */}
                        {index === 0 && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg">
                              ⭐ Öne Çıkan
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-sm text-gray-500 mb-3">
                          {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                        
                        <Link href={`/haberler/${haber.id}`}>
                          <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors cursor-pointer line-clamp-2">
                            {haber.title}
                          </h3>
                        </Link>
                        
                        {haber.subtitle && (
                          <p className="text-gray-600 mb-3 text-base line-clamp-2">
                            {haber.subtitle}
                          </p>
                        )}
                        
                        <div 
                          className="text-gray-600 leading-relaxed mb-4 prose prose-base max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: haber.description }}
                        />
                        
                        {/* Tags */}
                        {haber.tags && haber.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {haber.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={`inline-block px-3 py-1 rounded-full font-medium text-sm ${
                                  index === 0 
                                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <Link 
                          href={`/haberler/${haber.id}`}
                          className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold text-base transition-colors"
                        >
                          Devamını Oku
                          <svg className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Other Rows - 3 Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentNews.slice(2).map((haber) => (
                    <article
                      key={haber.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        {haber.imageUrl ? (
                          <Image
                            src={haber.imageUrl}
                            alt={haber.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-5xl text-gray-400">📰</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="text-sm text-gray-500 mb-3">
                          {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                        </div>
                        
                        <Link href={`/haberler/${haber.id}`}>
                          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors cursor-pointer line-clamp-2">
                            {haber.title}
                          </h3>
                        </Link>
                        
                        {haber.subtitle && (
                          <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                            {haber.subtitle}
                          </p>
                        )}
                        
                        <div 
                          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: haber.description }}
                        />
                        
                        {/* Tags */}
                        {haber.tags && haber.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {haber.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                            {haber.tags.length > 2 && (
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                                +{haber.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <Link 
                          href={`/haberler/${haber.id}`}
                          className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors"
                        >
                          Devamını Oku
                          <svg className="w-3 h-3 fill-current transition-transform group-hover:translate-x-1" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
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
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Haber Bültenimize Abone Olun
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Sepetli vinc sektöründen en son haberler ve teknik bilgilerden 
              haberdar olmak için e-posta adresinizi bırakın.
            </p>
            
            <form onSubmit={handleNewsletterSubscription} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
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
              İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
