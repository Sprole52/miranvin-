'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
}

const ServiceAreasPage = () => {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch service areas from Firestore
        const areasSnapshot = await getDocs(collection(db, 'hizmet_bolgeleri'));
        const areasData = areasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ServiceArea[];
        
        // Filter active areas and sort by order
        const activeAreas = areasData.filter(area => area.isActive);
        activeAreas.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setServiceAreas(activeAreas);

        // Fetch gallery items from Firestore and get last 3
        try {
          const gallerySnapshot = await getDocs(collection(db, 'gallery_items'));
          const galleryData = gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
          
          // Filter active items and get last 3
          const activeItems = galleryData.filter(item => item.isActive);
          
          // Sort by creation date (newest first) and get last 3
          const sortedItems = activeItems.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          
          // Get last 3 items (most recent)
          setGalleryItems(sortedItems.slice(-3));
        } catch (galleryError) {
          console.error('Galeri verisi yüklenirken hata:', galleryError);
          // Continue without gallery data
          setGalleryItems([]);
        }
        
      } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        setError('Veri yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Hata Oluştu</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Tekrar Dene
          </button>
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
            alt="Hizmet Bölgelerimiz Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-amber-400">Hizmet Bölgelerimiz</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            İstanbul&apos;un tüm bölgelerinde profesyonel vinc ve taşıma hizmetleri sunuyoruz
          </p>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hizmet Verdiğimiz Bölgeler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              İstanbul&apos;un her köşesinde 7/24 hizmetinizdeyiz. Acil durumlarınızda hemen yanınızdayız.
            </p>
          </div>

          {serviceAreas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz Hizmet Bölgesi Eklenmemiş</h3>
              <p className="text-gray-500">Admin panelinden hizmet bölgeleri ekleyebilirsiniz.</p>
              
              {/* Debug Info */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left max-w-2xl mx-auto">
                <h4 className="font-semibold text-gray-800 mb-2">Debug Bilgisi:</h4>
                <p className="text-sm text-gray-600">Loading: {loading.toString()}</p>
                <p className="text-sm text-gray-600">Service Areas Count: {serviceAreas.length}</p>
                <p className="text-sm text-gray-600">Error: {error || 'None'}</p>
                
                {/* Test Button */}
                <button
                  onClick={() => {
                    console.log('Testing Firestore data...');
                    console.log('Service Areas:', serviceAreas);
                    console.log('Loading:', loading);
                    console.log('Error:', error);
                    window.location.reload();
                  }}
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Sayfayı Yenile
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceAreas.map((area) => (
                <Link
                  key={area.id}
                  href={`/hizmet-bolgelerimiz/${area.slug}`}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={area.imageUrl || '/img/sayfa1.jpg'}
                      alt={area.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {area.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {area.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-amber-600 font-medium text-sm">
                      Detayları Gör
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Çalışmalarımızdan Örnekler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hizmet bölgelerimizde gerçekleştirdiğimiz projelerden görseller
            </p>
          </div>

          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {galleryItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden max-w-xs mx-auto">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl text-gray-300">🖼️</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay - Sadece göz simgesi */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 cursor-pointer transform scale-90 group-hover:scale-100 transition-transform duration-200 shadow-lg">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Henüz Galeri Resmi Eklenmemiş</h3>
              <p className="text-gray-500">Admin panelinden galeri resimleri ekleyebilirsiniz.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-300"
            >
              Tüm Galeriyi Gör
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Acil Tesisat Sorununuz mu Var?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            7/24 acil servis hizmetimizle hemen yanınızdayız. Hemen arayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905327899182"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              📞 Hemen Ara
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreasPage;
