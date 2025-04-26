import React from "react";
import Breadcrumb from "./../UI/BreadCrumb";
import { motion } from "framer-motion";
import { FaTruck, FaHeadset, FaMoneyBillWave } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const About = () => {
  return (
    <section className="px-4 md:px-16 py-10 space-y-20 bg-gray-50">
      <Breadcrumb
        paths={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
        ]}
      />

      {/* Our Story */}
      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={fadeInUp.transition}
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Founded in 2015, TechTrend has grown into Ghana's premier online
            tech accessories marketplace. We pride ourselves on offering
            carefully curated, high-quality products that enhance your digital
            lifestyle. With an ever-growing community of tech enthusiasts, we're
            more than just a store - we're your partner in staying ahead of the
            tech curve.
          </p>
        </div>
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
            alt="Our Team"
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {[
          { value: "10.5k", label: "Active Sellers" },
          { value: "33k", label: "Monthly Sales", active: true },
          { value: "45.5k", label: "Active Customers" },
          { value: "25k", label: "Annual Sales" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl ${
              stat.active
                ? "bg-gradient-to-br from-red-400 to-red-500 text-white shadow-red-500/30"
                : "bg-white"
            } shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-sm mt-2 opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Team Members */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {[
          {
            name: "Daniel Amekpoagbe Yawson",
            role: "Founder & Chairman",
            img: "/DSC_0358.jpg",
          },
          {
            name: "Emma Watson",
            role: "Managing Director",
            img: "/team/emma.png",
          },
          {
            name: "Will Smith",
            role: "Product Designer",
            img: "/team/will.png",
          },
        ].map((member, i) => (
          <motion.div key={i} whileHover={{ y: -10 }} className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-6">
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h4>
                <p className="text-red-500 font-medium mt-1">{member.role}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <span className="text-gray-400 hover:text-blue-400 transition-colors">
                    🌐
                  </span>
                  <span className="text-gray-400 hover:text-blue-700 transition-colors">
                    📱
                  </span>
                  <span className="text-gray-400 hover:text-gray-600 transition-colors">
                    💼
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Services */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {[
          {
            title: "Fast Delivery",
            subtitle: "Free delivery for all orders over GHS 140",
            icon: <FaTruck size={40} className="text-red-500" />,
          },
          {
            title: "24/7 Support",
            subtitle: "Dedicated customer support team",
            icon: <FaHeadset size={40} className="text-blue-500" />,
          },
          {
            title: "Money Back",
            subtitle: "30-day return guarantee",
            icon: <FaMoneyBillWave size={40} className="text-green-500" />,
          },
        ].map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="mb-6">{service.icon}</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {service.title}
            </h4>
            <p className="text-gray-600">{service.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
