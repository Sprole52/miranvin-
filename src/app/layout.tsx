import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Miranvinc - Profesyonel Sepetli Vinc Hizmetleri",
  description: "İstanbul'da profesyonel sepetli vinc, yük asansörü ve platform kiralama hizmetleri. Güvenli, hızlı ve kaliteli çözümler için Miranvinc'i tercih edin.",
  keywords: "sepetli vinc, yük asansörü, platform kiralama, istanbul vinc, güvenli vinc hizmeti, profesyonel vinc",
  authors: [{ name: "Miranvinc" }],
  creator: "Miranvinc",
  publisher: "Miranvinc",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon.png', sizes: '128x128', type: 'image/png' },
      { url: '/icon.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon.png' },
    ],
  },
  openGraph: {
    title: "Miranvinc - Profesyonel Sepetli Vinc Hizmetleri",
    description: "İstanbul'da profesyonel sepetli vinc, yük asansörü ve platform kiralama hizmetleri. Güvenli, hızlı ve kaliteli çözümler.",
    type: "website",
    locale: "tr_TR",
    siteName: "Miranvinc",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Miranvinc Logo'
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Miranvinc - Profesyonel Sepetli Vinc Hizmetleri",
    description: "İstanbul'da profesyonel sepetli vinc ve yük asansörü hizmetleri",
    images: ['/logo.png']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ReduxProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  // Admin sayfalarında Header, Footer ve FloatingContact gösterme
  // Bu kontrol client-side'da yapılacak
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
