import Footer from '@/components/Footer';
import LandingMain from '@/components/LandingMain';
import LandingNav from '@/components/navbar/landing/LandingNav';

export default function Home() {
  return (
    <>
      <div className="bg-gray-200 w-full h-full">
        <LandingNav />
        <LandingMain />
        <Footer />
      </div>
    </>
  );
}
