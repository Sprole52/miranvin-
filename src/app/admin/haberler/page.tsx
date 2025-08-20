'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import CKEditorComponent from '@/components/CKEditorComponent';

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

const AdminNews = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHaber, setEditingHaber] = useState<Haber | null>(null);
  
  // Form states
  const [haberForm, setHaberForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    content: '',
    imageUrl: '',
    tags: '',
    featured: false,
    isActive: true
  });

  // Image upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchHaberler();
  }, []);

  const fetchHaberler = async () => {
    try {
      setLoading(true);
      
      // Fetch news from Firestore
      const newsSnapshot = await getDocs(collection(db, 'haberler'));
      const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
      
      // Client-side sorting
      newsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setHaberler(newsData);
    } catch (error) {
      console.error('Haberler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      
      let finalImageUrl = haberForm.imageUrl;
      
      // If there's a new image file, handle the upload
      if (imageFile) {
        // For now, we'll use the base64 data URL as the image
        // In a real application, you'd upload to a cloud service like Firebase Storage
        finalImageUrl = imagePreview;
      }
      
      const haberData = {
        ...haberForm,
        imageUrl: finalImageUrl,
        tags: haberForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString()
      };

      if (editingHaber) {
        // Update existing news
        await updateDoc(doc(db, 'haberler', editingHaber.id), haberData);
        
        // Eğer bu haber öne çıkan olarak işaretlendiyse, diğerlerini öne çıkan olmaktan çıkar
        if (haberData.featured) {
          const otherNews = haberler.filter(h => h.id !== editingHaber.id && h.featured);
          for (const news of otherNews) {
            await updateDoc(doc(db, 'haberler', news.id), { featured: false });
          }
        }
      } else {
        // Add new news
        await addDoc(collection(db, 'haberler'), {
          ...haberData,
          createdAt: new Date().toISOString()
        });
        
        // Eğer yeni haber öne çıkan olarak işaretlendiyse, diğerlerini öne çıkan olmaktan çıkar
        if (haberData.featured) {
          const featuredNews = haberler.filter(h => h.featured);
          for (const news of featuredNews) {
            await updateDoc(doc(db, 'haberler', news.id), { featured: false });
          }
        }
      }
      
      setShowAddModal(false);
      setEditingHaber(null);
      setHaberForm({ title: '', subtitle: '', description: '', content: '', imageUrl: '', tags: '', featured: false, isActive: true });
      setImagePreview('');
      setImageFile(null);
      fetchHaberler();
    } catch (error) {
      console.error('Haber kaydedilirken hata:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (haber: Haber) => {
    setEditingHaber(haber);
    setHaberForm({
      title: haber.title,
      subtitle: haber.subtitle,
      description: haber.description,
      content: haber.content,
      imageUrl: haber.imageUrl,
      tags: haber.tags.join(', '),
      featured: haber.featured,
      isActive: haber.isActive
    });
    setImagePreview(haber.imageUrl);
    setImageFile(null);
    setShowAddModal(true);
  };





  const handleDelete = async (haberId: string) => {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'haberler', haberId));
        fetchHaberler();
      } catch (error) {
        console.error('Haber silinirken hata:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-xl text-white">📰</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Haber Yönetimi</h1>
              <p className="text-gray-600 mt-1">Haberleri yönetin ve yeni içerik ekleyin</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Toplam Haber</p>
                  <p className="text-2xl font-bold text-gray-900">{haberler.length}</p>
                </div>
                <span className="text-2xl">📰</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Öne Çıkan</p>
                  <p className="text-2xl font-bold text-gray-900">{haberler.filter(h => h.featured).length}</p>
                </div>
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{haberler.filter(h => h.isActive).length}</p>
                </div>
                <span className="text-2xl">✅</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Bu Ay</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {haberler.filter(h => new Date(h.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length}
                  </p>
                </div>
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Haberler</h2>
            <p className="text-gray-600 mt-1">Tüm haberleri görüntüleyin ve yönetin</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Yeni Haber
          </button>
        </div>

        {/* News List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              {haberler.map((haber) => (
                <div key={haber.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 flex-shrink-0">
                      {haber.imageUrl && (
                        <Image
                          src={haber.imageUrl}
                          alt={haber.title}
                          width={80}
                          height={60}
                          className="w-20 h-15 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{haber.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{haber.subtitle}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR')}</span>
      
                            {haber.featured && (
                              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                                ⭐ Öne Çıkan
                              </span>
                            )}
                            {haber.isActive ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                ✅ Aktif
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                ❌ Pasif
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEdit(haber)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                          >
                            Düzenle
                          </button>
                          <button 
                            onClick={() => handleDelete(haber.id)}
                            className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition-colors"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{haber.description}</p>
                      
                      {/* Tags */}
                      {haber.tags && haber.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {haber.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {haberler.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz haber eklenmemiş</h3>
                  <p className="text-gray-500">
                    İlk haberinizi eklemek için &ldquo;Yeni Haber&rdquo; butonuna tıklayın.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit News Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full h-[95vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex-shrink-0 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingHaber ? 'Haber Düzenle' : 'Yeni Haber Ekle'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setEditingHaber(null);
                  setHaberForm({ title: '', subtitle: '', description: '', content: '', imageUrl: '', tags: '', featured: false, isActive: true });
                  setImagePreview('');
                  setImageFile(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Temel Bilgiler - Üstte */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
                  <input
                    type="text"
                    value={haberForm.title}
                    onChange={(e) => setHaberForm({...haberForm, title: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Haber başlığı"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                  <input
                    type="text"
                    value={haberForm.subtitle}
                    onChange={(e) => setHaberForm({...haberForm, subtitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Haber alt başlığı"
                  />
                </div>
              </div>
              
              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama *</label>
                <textarea
                  rows={3}
                  value={haberForm.description}
                  onChange={(e) => setHaberForm({...haberForm, description: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Haber açıklaması"
                ></textarea>
              </div>
              
              {/* Resim URL'si */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL&apos;si</label>
                <input
                  type="url"
                  value={haberForm.imageUrl}
                  onChange={(e) => setHaberForm({...haberForm, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="https://example.com/resim.jpg"
                />
              </div>
              
              {/* Etiketler */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etiketler (virgülle ayırın)</label>
                <input
                  type="text"
                  value={haberForm.tags}
                  onChange={(e) => setHaberForm({...haberForm, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="tesisat, su, kurulum, ipucu"
                />
              </div>
              
              {/* Öne Çıkan ve Aktif */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={haberForm.featured}
                    onChange={(e) => setHaberForm({...haberForm, featured: e.target.checked})}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">Öne Çıkan</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={haberForm.isActive}
                    onChange={(e) => setHaberForm({...haberForm, isActive: e.target.checked})}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">Aktif</label>
                </div>
              </div>
              
              {/* İçerik - En Altta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İçerik *</label>
                <div className="border border-gray-300 rounded-lg">
                  <CKEditorComponent
                    value={haberForm.content}
                    onChange={(data) => setHaberForm({...haberForm, content: data})}
                    placeholder="Haber içeriği..."
                    height="250px"
                    label=""
                  />
                </div>
              </div>
              </div>
              
              {/* Fixed Bottom Buttons */}
              <div className="flex-shrink-0 border-t border-gray-200 p-6">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingHaber(null);
                      setHaberForm({ title: '', subtitle: '', description: '', content: '', imageUrl: '', tags: '', featured: false, isActive: true });
                      setImagePreview('');
                      setImageFile(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {editingHaber ? 'Güncelleniyor...' : 'Ekleniyor...'}
                      </>
                    ) : (
                      editingHaber ? 'Güncelle' : 'Ekle'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
