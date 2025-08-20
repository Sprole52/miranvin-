'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

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

const GaleriPage = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.categoryId === selectedCategory));
    }
    setCurrentPage(1);
  }, [selectedCategory, galleryItems]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      
      const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
      const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryCategory[];
      
      categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(categoriesData);

      const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
      const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
      
      itemsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setGalleryItems(itemsData);
      setFilteredItems(itemsData);
      
    } catch (error) {
      console.error('Galeri verisi yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Galeri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://www.bacanaklarvinc.com.tr/assets/img/sepetli-vinc/43metre-sepetli-vinc-1.jpg"
            alt="Galeri Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
        
        {/* Simple Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">Galeri</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-3xl mx-auto">
            Sepetli vinc projelerimizden örnekler ve başarılı çalışmalarımızı keşfedin
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projelerimizi <span className="text-yellow-600">İnceleyin</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tamamladığımız sepetli vinc projelerinden örnekler ve detaylı bilgiler
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center border-b border-gray-100 pb-3">
                  Kategoriler
                </h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-yellow-500 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                    }`}
                  >
                    🏠 Tümü ({galleryItems.length})
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-yellow-500 text-white shadow-sm'
                          : 'bg-gray-50 text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                      }`}
                    >
                      {category.icon} {category.name} ({galleryItems.filter(item => item.categoryId === category.id).length})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Gallery */}
            <div className="lg:col-span-3">
              {/* Gallery Grid Header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'Tüm Projeler' : getCategoryName(selectedCategory)}
                  </h3>
                  <span className="text-sm text-gray-500 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200">
                    {filteredItems.length} proje bulundu
                  </span>
                </div>
              </div>

              {/* Gallery Grid */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-20 bg-yellow-50 rounded-2xl border-2 border-dashed border-yellow-300">
                  <div className="text-6xl mb-6">🖼️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Proje bulunamadı</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {selectedCategory === 'all' 
                      ? 'Henüz galeri projesi eklenmemiş. Yakında güzel projelerimizi görebileceksiniz.' 
                      : 'Bu kategoride henüz proje bulunmuyor. Diğer kategorileri kontrol edebilirsiniz.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
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
                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-full p-3 cursor-pointer transform scale-90 group-hover:scale-100 transition-transform duration-200 shadow-lg"
                          >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <nav className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-yellow-200'
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
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          currentPage === page
                            ? 'bg-yellow-500 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-yellow-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 border border-yellow-200'
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
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                  {selectedItem.imageUrl ? (
                    <Image
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl text-gray-300">🖼️</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Kategori</h3>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <span className="text-2xl">{getCategoryIcon(selectedItem.categoryId)}</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {getCategoryName(selectedItem.categoryId)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Açıklama</h3>
                    <div 
                      className="text-gray-900 leading-relaxed prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg border border-gray-100"
                      dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                    />
                  </div>
                  
                  {selectedItem.tags && selectedItem.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Etiketler</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium border border-yellow-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriPage;
