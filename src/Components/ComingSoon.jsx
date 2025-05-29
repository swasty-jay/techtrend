import React, { useState, useEffect } from 'react';
import { Package, Zap, Sparkles, Bell, ArrowRight, Clock, Star } from 'lucide-react';

const ComingSoonPage = ({ category }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({ days: 15, hours: 8, minutes: 42, seconds: 30 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const categoryData = {
    merchandise: {
      title: 'Merchandise',
      subtitle: 'Premium Tech Apparel & Collectibles',
      description: 'Get ready for exclusive tech-themed clothing, accessories, and collectibles that showcase your passion for innovation.',
      icon: Package,
      gradient: 'from-purple-600 via-pink-500 to-orange-400',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
      features: ['Limited Edition Items', 'Premium Quality Materials', 'Exclusive Designs'],
      color: 'purple'
    },
    electronics: {
      title: 'Electronics',
      subtitle: 'Cutting-Edge Tech Devices',
      description: 'Discover the latest smartphones, laptops, smart home devices, and innovative gadgets that define the future.',
      icon: Zap,
      gradient: 'from-blue-600 via-cyan-500 to-teal-400',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      features: ['Latest Technology', 'Competitive Prices', 'Expert Reviews'],
      color: 'blue'
    },
    accessories: {
      title: 'Accessories',
      subtitle: 'Essential Tech Companions',
      description: 'Complete your tech setup with premium cases, chargers, cables, and accessories designed for the modern lifestyle.',
      icon: Sparkles,
      gradient: 'from-emerald-600 via-green-500 to-lime-400',
      bgPattern: 'bg-gradient-to-br from-emerald-50 to-green-50',
      features: ['Premium Materials', 'Perfect Compatibility', 'Stylish Designs'],
      color: 'emerald'
    }
  };

  const data = categoryData[category] || categoryData.electronics;
  const IconComponent = data.icon;

  return (
    <div className={`min-h-screen ${data.bgPattern} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon and Brand */}
          <div className="mb-8 flex justify-center">
            <div className={`relative p-6 rounded-3xl bg-gradient-to-r ${data.gradient} shadow-2xl transform hover:scale-105 transition-transform duration-300`}>
              <IconComponent className="w-16 h-16 text-white" />
              <div className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {data.title}
            </h1>
            <h2 className={`text-2xl md:text-3xl font-semibold mb-6 text-${data.color}-600`}>
              {data.subtitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Launching Soon
            </h3>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds }
              ].map((item, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                  <div className="text-3xl font-bold text-gray-800">{item.value.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {data.features.map((feature, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
                  <Star className={`w-6 h-6 text-${data.color}-500 mb-3 mx-auto`} />
                  <h4 className="font-semibold text-gray-800">{feature}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Email Subscription */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bell className={`w-5 h-5 text-${data.color}-500`} />
                <h3 className="text-lg font-semibold text-gray-800">Get Notified</h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Be the first to know when we launch and get exclusive early access!
              </p>
              
              {!isSubscribed ? (
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800 bg-white/90"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSubscribe(e);
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSubscribe}
                    disabled={!email}
                    className={`w-full bg-gradient-to-r ${data.gradient} text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Notify Me
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${data.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">You're all set!</h4>
                  <p className="text-gray-600 text-sm">We'll notify you as soon as we launch.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-lg font-medium">
              TechTrend - Where Innovation Meets Style
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;

// // Demo component to show all three pages
// const ComingSoonDemo = () => {
//   const [currentPage, setCurrentPage] = useState('merchandise');

//   return (
//     <div className="min-h-screen">
//       {/* Navigation for demo */}
//       <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
//         <div className="flex gap-2">
//           {['merchandise', 'electronics', 'accessories'].map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-6 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
//                 currentPage === page
//                   ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
//                   : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
//               }`}
//             >
//               {page.charAt(0).toUpperCase() + page.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       <ComingSoonPage category={currentPage} />
//     </div>
//   );
// };

// export default ComingSoonDemo;