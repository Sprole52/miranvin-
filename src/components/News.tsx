'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

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

const News = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news from Firestore
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        // Filter active news and sort by order, then take only the latest 3
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        const latestNews = activeNews.slice(0, 3);
        
        setHaberler(latestNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Haberler yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (haberler.length === 0) {
    return null; // Don't show anything if no news
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 text-yellow-600 text-sm font-semibold mb-6 px-6 py-3 bg-yellow-50 rounded-full border border-yellow-200">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span className="text-sm">GÜNCEL HABERLERİMİZ</span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          </div>
          <h2 className="text-4xl md:text-4xl font-black text-gray-900 mb-8">
            Blog & <span className="text-yellow-500">Haberler</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sepetli vinc sektöründen en güncel haberler ve uzman önerilerini takip edin.
          </p>
        </div>

        {/* News Grid - New Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {haberler.map((haber) => (
            <article
              key={haber.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                {haber.imageUrl ? (
                  <Image
                    src={haber.imageUrl}
                    alt={haber.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <span className="text-6xl text-yellow-600">📰</span>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Featured Badge */}
                {haber.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    ⭐ ÖNE ÇIKAN
                  </div>
                )}
                
                {/* Date Badge - Hover'da ortaya çıkar */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                  {new Date(haber.createdAt).toLocaleDateString('tr-TR')}
                </div>
                
                {/* Hover Content Overlay */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {haber.title}
                    </h3>
                    {haber.subtitle && (
                      <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                        {haber.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Content - Hover'da değişir */}
              <div className="p-6 relative">
                {/* Default Content */}
                <div className="group-hover:opacity-0 transition-opacity duration-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {haber.title}
                  </h3>
                  
                  {haber.subtitle && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{haber.subtitle}</p>
                  )}
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {haber.description}
                  </p>
                </div>
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {haber.description}
                    </p>
                    
                    {/* Tags - Hover'da ortaya çıkar */}
                    {haber.tags && haber.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {haber.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium border border-yellow-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Read More Button - Hover'da ortaya çıkar */}
                  <div className="mt-auto">
                    <Link 
                      href={`/haberler/${haber.id}`}
                      className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold text-sm hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Devamını Oku
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/haberler"
            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Tüm Haberleri Gör
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;

