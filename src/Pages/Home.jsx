import HeroSection from "../UI/HeroSection";
import Tabs from "../Components/Tabs";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900 font-sans">
      <HeroSection />
      <div className="p-1">
        <h2 className="text-3xl font-bold text-center mb-8">Browse Products</h2>
        <Tabs />
      </div>
    </div>
  );
};

export default Homepage;
