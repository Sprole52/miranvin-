import Hero from '@/components/Hero';
import Services from '@/components/Services';
import News from '@/components/News';
import Gallery from '@/components/Gallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import References from '@/components/References';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <News />
      <WhyChooseUs />
      <Gallery />
      <References />
      <FAQ />
      <Contact />
    </main>
  );
}
