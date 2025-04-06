import NavBar from "../Components/NavBar";
import HeroSection from "../UI/HeroSection";
import Footer from "../Components/Footer";
import Tabs from "../Components/Tabs";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900 font-sans">
      <NavBar />
      <HeroSection />
      <div className="p-1">
        <h2 className="text-3xl font-bold text-center mb-8">Browse Products</h2>
        <Tabs />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
