import { FaShippingFast, FaHeadset } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const NewArrival = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <span className="text-red-500 font-semibold">Featured</span>
        <h2 className="text-2xl font-bold mt-1">New Arrival</h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="relative row-span-2">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/16/13/55/video-game-2234745_1280.jpg"
            alt="PlayStation 5"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">PlayStation 5</h3>
            <p className="text-sm">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button className="mt-2 bg-black text-white px-4 py-2 text-sm rounded">
              Shop Now
            </button>
          </div>
        </div>
        <div className="relative col-span-2">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/16/13/55/video-game-2234745_1280.jpg"
            alt="Women's Collection"
            className="w-full h-68 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">Women’s Collections</h3>
            <p className="text-sm">
              Featured woman collections that give you another vibe.
            </p>
            <button className="mt-2 bg-black text-white px-4 py-2 text-sm rounded">
              Shop Now
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/16/13/55/video-game-2234745_1280.jpg"
            alt="Speakers"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">Speakers</h3>
            <p className="text-sm">Amazon wireless speakers</p>
            <button className="mt-2 bg-black text-white px-4 py-2 text-sm rounded">
              Shop Now
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2017/04/16/13/55/video-game-2234745_1280.jpg"
            alt="Perfume"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-semibold">Perfume</h3>
            <p className="text-sm">GUCCI INTENSE OUD EDP</p>
            <button className="mt-2 bg-black text-white px-4 py-2 text-sm rounded">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-3xl mb-2" />
          <h4 className="font-bold">FREE AND FAST DELIVERY</h4>
          <p className="text-sm">Free delivery for all orders over $140</p>
        </div>
        <div className="flex flex-col items-center">
          <FaHeadset className="text-3xl mb-2" />
          <h4 className="font-bold">24/7 CUSTOMER SERVICE</h4>
          <p className="text-sm">Friendly 24/7 customer support</p>
        </div>
        <div className="flex flex-col items-center">
          <MdVerified className="text-3xl mb-2" />
          <h4 className="font-bold">MONEY BACK GUARANTEE</h4>
          <p className="text-sm">We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
