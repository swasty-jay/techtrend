import React, { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const navigate =useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks! We'll be in touch.");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => {navigate('/')
      
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-mono text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you. Fill out the form and we’ll respond soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-vertical"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-mono hover:from-blue-700 hover:to-purple-800 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> send message
          
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2 mb-2 ">
            <Phone className="w-4 h-4 text-gray-600" />
            0245870688
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-gray-600" />
            support@techtrend.com
          </div>
        </div>
      </div>
    </div>
  );
}
