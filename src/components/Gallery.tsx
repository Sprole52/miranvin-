'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const Gallery = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryCategory[];
        
        // Client-side sorting
        categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(categoriesData);

        // Fetch gallery items
        const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
        const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
        
        // Filter active items, sort by order, and take only the latest 6
        const activeItems = itemsData.filter(item => item.isActive);
        activeItems.sort((a, b) => (a.order || 0) - (b.order || 0));
        const latestItems = activeItems.slice(0, 3);
        
        setGalleryItems(latestItems);
        
      } catch (error) {
        console.error('Galeri verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Kategori Yok';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : '📷';
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Galeri yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return null; // Don't show anything if no gallery items
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Çalışma <span className="text-yellow-500">Örneklerimiz</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Başarıyla tamamladığımız sepetli vinc projelerinden örnekler ve çalışma alanlarımız.
          </p>
        </div>

        {/* Gallery Grid - Redesigned Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl text-gray-400">📷</span>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Featured Badge */}
                {item.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                    ⭐ ÖNE ÇIKAN
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-2 rounded-full shadow-md border border-gray-200/50">
                  <span className="mr-1">{getCategoryIcon(item.categoryId)}</span>
                  {getCategoryName(item.categoryId)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Decorative Line */}
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-4"></div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                
                {item.description && (
                  <div 
                    className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
                
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 text-xs rounded-full font-medium border border-yellow-200/50 hover:border-yellow-300 transition-colors duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* View Details Link */}
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/galeri`}
                    className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold text-sm transition-all duration-300 group/link"
                  >
                    Detayları Gör
                    <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  {/* Arrow Icon */}
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-500 transition-colors duration-300">
                    <svg className="w-4 h-4 text-yellow-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            href="/galeri"
            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Tüm Galeriyi Gör
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

