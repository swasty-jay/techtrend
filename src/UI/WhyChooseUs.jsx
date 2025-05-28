import {
  ShoppingCart,
  Clock,
  Shield,
  Heart,
  DollarSign,
  Award,
  Cpu,
  Headphones,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-8 border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Why Choose Our Tech Store
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* First Benefits Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Shopping Benefits
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <ShoppingCart size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Free Express Shipping</h4>
                  <p className="text-sm text-gray-600">
                    On all orders over $100
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <DollarSign size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Money Back Guarantee</h4>
                  <p className="text-sm text-gray-600">
                    30-day no questions asked
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Clock size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">24/7 Tech Support</h4>
                  <p className="text-sm text-gray-600">Expert help anytime</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Shield size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Secure Payment</h4>
                  <p className="text-sm text-gray-600">
                    100% protected checkout
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Benefits Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Tech Advantages
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Cpu size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Expert Tech Advice</h4>
                  <p className="text-sm text-gray-600">
                    Personalized recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Award size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Extended Warranties</h4>
                  <p className="text-sm text-gray-600">
                    Additional protection plans
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Headphones size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Free Setup Assistance</h4>
                  <p className="text-sm text-gray-600">
                    Help with your new devices
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Heart size={22} className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Loyalty Rewards</h4>
                  <p className="text-sm text-gray-600">
                    Earn points with every purchase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
