import React, { useState, useEffect } from 'react';
import { PackageSearch, Clock, Bell, ArrowRight, Star } from 'lucide-react';

const Orders = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({ days: 10, hours: 6, minutes: 30, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-400 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <PackageSearch className="w-16 h-16 text-white" />
              <div className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Order Tracking
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-600">
            Track Your Orders with Ease
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stay updated on your purchases every step of the way. Real-time order tracking is almost here.
          </p>

          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" /> Launching Soon
            </h3>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20"
                >
                  <div className="text-3xl font-bold text-gray-800">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {['Real-Time Updates', 'Email Alerts', 'Multi-Courier Support'].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300"
                >
                  <Star className="w-6 h-6 text-blue-500 mb-3 mx-auto" />
                  <h4 className="font-semibold text-gray-800">{feature}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Get Notified</h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Be the first to know when tracking goes live.
              </p>

              {!isSubscribed ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 bg-white/90"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={!email}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Notify Me
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">You're all set!</h4>
                  <p className="text-gray-600 text-sm">We'll notify you as soon as we launch.</p>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-500 text-lg font-medium mt-8">
            Powered by YourStore — Always On Track
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders