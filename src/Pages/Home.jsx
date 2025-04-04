import NavBar from "../Components/NavBar";
import CategoryCard from "../Components/CategoryCard";
import HeroSection from "../UI/HeroSection";
// import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import SearchBar from "../Features/Search/SearchBar";
import Tabs from "../Components/Tabs";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900 font-sans">
      <NavBar />
      {/* Hero Section */}
      <HeroSection />
      {/* Search Bar */}
      <SearchBar />
      {/* Categories Section */}
      <div className="p-1">
        <h2 className="text-3xl font-bold text-center mb-8">Browse Products</h2>

        {/* Tabs Component */}
        <Tabs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
