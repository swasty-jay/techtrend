import NavBar from "../Components/NavBar";
import CategoryCard from "../Components/CategoryCard";
import HeroSection from "../UI/HeroSection";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import SearchBar from "../Features/Search/SearchBar";
import AppleProducts from "../Components/AppleProducts";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-200 text-gray-900 font-sans">
      <NavBar />
      {/* Hero Section */}
      <HeroSection />
      {/* Search Bar */}
      <SearchBar />
      {/* Categories Section */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <CategoryCard
            title="iPhone Cases"
            image="https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/bg-images//Best-iPhone-Accessories-0-Hero.jpg"
          />
          <CategoryCard
            title="Samsung Chargers"
            image="https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/samsung-products//Samsung-Mobile-Design-Story-Galaxy-Z-Fold6-and-Flip6_Ultra-Modern-Ultra-Sleek_main1.jpg"
          />
          <CategoryCard
            title="Earbuds & Headphones"
            image="https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/apple-products//bento_1_airpod_max_midnight__4jy1tkqh9qay_large_2x.jpg"
          />
          <CategoryCard
            title="Gaming Accessories"
            image="https://pavqfszqmpbdicesddag.supabase.co/storage/v1/object/public/apple-products//ps5-slim-edition.webp"
          />
        </div>
      </section>

      {/* Featured Products */}
      <AppleProducts />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
