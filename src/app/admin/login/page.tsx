'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, loginWithStaticAdmin, clearError, checkDatabaseAdmins } from '@/store/slices/authSlice';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated, hasDatabaseAdmins } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Component mount'ta veritabanında admin var mı kontrol et
  useEffect(() => {
    dispatch(checkDatabaseAdmins());
  }, [dispatch]);

  // Clear error on component mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/admin');
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      // Veritabanında admin varsa normal giriş, yoksa statik admin girişi
      if (hasDatabaseAdmins) {
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        await dispatch(loginWithStaticAdmin({ email, password })).unwrap();
      }
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      router.push('/admin');
    } catch (err) {
      // Error is handled by Redux
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-100 shadow-xl rounded-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-1">Admin Girişi</h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            {hasDatabaseAdmins 
              ? 'Veritabanı admin hesabı ile giriş yapın' 
              : 'Statik admin hesabı ile giriş yapın'
            }
          </p>

          {!hasDatabaseAdmins && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Statik Admin Bilgileri:</p>
                  <p>E-posta: admin@sekaaltyapi.com</p>
                  <p>Şifre: admin123</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <div className="absolute left-3 top-[42px] text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0z" /></svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="ornek@tesisat.com"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <div className="absolute left-3 top-[42px] text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.942 0 1.707-.765 1.707-1.707S12.942 7.586 12 7.586s-1.707.765-1.707 1.707S11.058 11 12 11z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 11V7a5 5 0 10-10 0v4m-2 0h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" /></svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                aria-label="Şifreyi göster/gizle"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.645 11.645 0 013.77-4.65M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8" /></svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg text-white font-medium transition-colors shadow-sm ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Giriş Yap
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Bu alan sadece yetkili kullanıcılar içindir.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
