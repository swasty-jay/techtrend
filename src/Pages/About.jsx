import React, { useEffect } from "react";
import Breadcrumb from "./../UI/BreadCrumb";
import { motion, useAnimation } from "framer-motion";
import {
  FaTruck,
  FaHeadset,
  FaMoneyBillWave,
  FaLinkedin,
  FaTwitter,
  FaBriefcase,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const About = () => {
  // Animation controls
  const controls = {
    story: useAnimation(),
    stats: useAnimation(),
    team: useAnimation(),
    services: useAnimation(),
  };

  // Intersection observers
  const [storyRef, storyInView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  const [statsRef, statsInView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  const [teamRef, teamInView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  const [servicesRef, servicesInView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  // Trigger animations when sections come into view
  useEffect(() => {
    if (storyInView) {
      controls.story.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
      });
    }
    if (statsInView) {
      controls.stats.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, staggerChildren: 0.1 },
      });
    }
    if (teamInView) {
      controls.team.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, staggerChildren: 0.2 },
      });
    }
    if (servicesInView) {
      controls.services.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, staggerChildren: 0.15 },
      });
    }
  }, [storyInView, statsInView, teamInView, servicesInView, controls]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Breadcrumb
            paths={[
              { label: "Home", to: "/" },
              { label: "About", to: "/about" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
          >
            About <span className="text-red-500">TechTrend</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Bringing the latest tech accessories to Ghanaian tech enthusiasts
            since 2015
          </motion.p>
        </div>

        {/* Our Story */}
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, y: 30 }}
          animate={controls.story}
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto mb-24 md:mb-32"
        >
          <div className="space-y-6 md:pr-6">
            <div className="inline-block pb-1 mb-2">
              <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">
                Our Journey
              </span>
              <div className="h-1 w-10 bg-red-500 mt-1"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
              A Passion for Technology & Innovation
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded in 2015, TechTrend has grown into Ghana's premier online
              tech accessories marketplace. We pride ourselves on offering
              carefully curated, high-quality products that enhance your digital
              lifestyle.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              With an ever-growing community of tech enthusiasts, we're more
              than just a store - we're your partner in staying ahead of the
              tech curve. Our mission is to make cutting-edge technology
              accessible to everyone.
            </p>
            <button className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <span>Learn more about our mission</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              alt="Our Team"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xl font-semibold">Our dedicated team</p>
              <p className="text-white/80">Passionate about technology</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial=""
          animate={controls.stats}
          className="max-w-6xl mx-auto px-4 mb-24 md:mb-32"
        >
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
              By The Numbers
            </h2>
            <div className="h-1 w-20 bg-red-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "10.5k+", label: "Active Sellers", icon: "👥" },
              {
                value: "33k+",
                label: "Monthly Sales",
                active: true,
                icon: "📈",
              },
              { value: "45.5k+", label: "Active Customers", icon: "🛍️" },
              { value: "25k+", label: "Annual Sales", icon: "💰" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`p-6 rounded-2xl ${
                  stat.active
                    ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30"
                    : "bg-white"
                } shadow-xl hover:shadow-2xl transition-all duration-500`}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p
                  className={`text-sm mt-2 ${
                    stat.active ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          ref={teamRef}
          variants={staggerContainer}
          initial=""
          animate={controls.team}
          className="max-w-6xl mx-auto px-4 mb-24 md:mb-32"
        >
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">
              Meet Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
              The People Behind TechTrend
            </h2>
            <div className="h-1 w-20 bg-red-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                name: "Daniel Amekpoagbe Yawson",
                role: "Founder & Chairman",
                img: "/DSC_0358.jpg",
                bio: "Tech visionary with over 15 years of experience in the industry.",
              },
              {
                name: "Emma Watson",
                role: "Managing Director",
                img: "/team/emma.png",
                bio: "Former tech executive bringing global expertise to the Ghanaian market.",
              },
              {
                name: "Will Smith",
                role: "Product Designer",
                img: "/team/will.png",
                bio: "Award-winning designer focused on creating intuitive user experiences.",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-100">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-red-500 font-medium mt-1">
                      {member.role}
                    </p>
                    <p className="text-gray-600 mt-3 text-sm">{member.bio}</p>
                    <div className="flex gap-4 mt-5 pt-4 border-t border-gray-100">
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FaLinkedin size={18} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter size={18} />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <FaBriefcase size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          ref={servicesRef}
          variants={staggerContainer}
          initial=""
          animate={controls.services}
          className="max-w-6xl mx-auto px-4"
        >
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold tracking-wider uppercase text-sm">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
              Our Services
            </h2>
            <div className="h-1 w-20 bg-red-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                subtitle: "Free delivery for all orders over GHS 140",
                description:
                  "We ensure your products reach you quickly and safely with our premium delivery service.",
                icon: <FaTruck size={40} className="text-red-500" />,
                color: "bg-red-50",
              },
              {
                title: "24/7 Support",
                subtitle: "Dedicated customer support team",
                description:
                  "Our expert support team is available around the clock to assist with any questions or concerns.",
                icon: <FaHeadset size={40} className="text-blue-500" />,
                color: "bg-blue-50",
              },
              {
                title: "Money Back",
                subtitle: "30-day return guarantee",
                description:
                  "Shop with confidence knowing you can return any product within 30 days if you're not satisfied.",
                icon: <FaMoneyBillWave size={40} className="text-green-500" />,
                color: "bg-green-50",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.color} mb-6`}
                >
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h4>
                <p className="text-red-500 font-medium text-sm mb-3">
                  {service.subtitle}
                </p>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mt-24 md:mt-32 mb-10 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative px-6 py-10 md:p-12 text-white text-center">
            <div className="absolute inset-0 bg-black opacity-10 pattern-dots"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to enhance your tech experience?
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of satisfied customers who have transformed their
                digital lifestyle with TechTrend's premium accessories
              </p>
              <button className="px-8 py-3 bg-white text-red-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
