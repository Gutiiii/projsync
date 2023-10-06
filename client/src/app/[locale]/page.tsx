import LandingMain from '@/components/LandingMain';
import LandingNav from '@/components/navbar/LandingNav';

export default async function Home() {
  return (
    <>
      <div className="bg-gray-200 w-full">
        <LandingNav />
        <LandingMain />
      </div>
    </>
  );
}
