'use client'
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const AdminSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { changePassword, user, error, successMessage } = useAuth();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setIsLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await changePassword(currentPassword, newPassword);
      
      if (result.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error: unknown) {
      console.error('Password change error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Şifre Değiştir</h1>
        <p className="text-gray-600">Hesap güvenliğiniz için şifrenizi güncelleyin</p>
      </div>

      {/* Statik Admin Uyarısı */}
      {user?.isStaticAdmin && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Statik Admin Hesabı</p>
              <p>Statik admin hesabı için şifre değiştirme desteklenmemektedir. Güvenlik için lütfen yeni bir veritabanı admin hesabı oluşturun.</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Display */}
      {(error || successMessage) && (
        <div className="mb-6 max-w-md">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm animate-pulse mb-3">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm animate-bounce">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{successMessage}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Password Change Form */}
      <div className="max-w-md">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <form onSubmit={handlePasswordChange} className="space-y-6">
            {user?.isStaticAdmin && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-gray-600 text-sm">
                  Statik admin hesabı için şifre değiştirme özelliği devre dışıdır.
                </p>
              </div>
            )}
            {!user?.isStaticAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Mevcut şifrenizi girin"
                  disabled={isLoading}
                />
              </div>
            )}
            
            {!user?.isStaticAdmin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Yeni şifrenizi girin"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500 mt-1">En az 6 karakter olmalıdır</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yeni Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Yeni şifrenizi tekrar girin"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            {!user?.isStaticAdmin && (
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-700'
                  } text-white font-medium`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Güncelleniyor...
                    </div>
                  ) : (
                    'Şifreyi Güncelle'
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Security Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Güvenlik İpuçları</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Güçlü bir şifre için büyük/küçük harf, rakam ve özel karakter kullanın</li>
            <li>• Şifrenizi kimseyle paylaşmayın</li>
            <li>• Düzenli olarak şifrenizi değiştirin</li>
            <li>• Farklı hesaplar için farklı şifreler kullanın</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
