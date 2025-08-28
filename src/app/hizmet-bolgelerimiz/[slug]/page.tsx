'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

const ServiceAreaDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [serviceArea, setServiceArea] = useState<ServiceArea | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceArea = async () => {
      try {
        // Fetch service area by slug
        const q = query(
          collection(db, 'hizmet_bolgeleri'),
          where('slug', '==', slug),
          where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const areaData = { id: doc.id, ...doc.data() } as ServiceArea;
          setServiceArea(areaData);
          
          // Fetch some gallery images for this area
          const galleryQuery = query(
            collection(db, 'galeri'),
            where('isActive', '==', true),
            limit(6)
          );
          const gallerySnapshot = await getDocs(galleryQuery);
          const images = gallerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GalleryImage[];
          setGalleryImages(images);
        }
      } catch (error) {
        console.error('Error fetching service area:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchServiceArea();
    }
  }, [slug]);

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

  if (!serviceArea) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hizmet Bölgesi Bulunamadı</h1>
          <p className="text-gray-600">Aradığınız hizmet bölgesi mevcut değil veya aktif değil.</p>
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
            src={serviceArea.imageUrl || '/img/sayfa1.jpg'}
            alt={serviceArea.name}
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
            <span className="text-amber-400">{serviceArea.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            {serviceArea.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: serviceArea.content }}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {serviceArea.name} Bölgesi Çalışmalarımızdan
              </h2>
              <p className="text-lg text-gray-600">
                Bu bölgede gerçekleştirdiğimiz projelerden örnekler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {serviceArea.name} Bölgesinde Hizmet mi Arıyorsunuz?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Hemen arayın, en kısa sürede yanınızdayız!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905326991552"
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              📞 Hemen Ara
            </a>
            <a
              href="https://wa.me/905326991552/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Gallery Image"
              width={800}
              height={600}
              className="object-contain max-h-full"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceAreaDetailPage;
