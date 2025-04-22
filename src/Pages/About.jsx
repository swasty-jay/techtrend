import React from "react";
import Breadcrumb from "./../UI/BreadCrumb";

const About = () => {
  return (
    <section className="px-4 md:px-16 py-10 space-y-20">
      <Breadcrumb
        paths={[
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
        ]}
      />

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-roboto mb-4">Our Story</h2>
          <p className="text-gray-700 leading-7">
            Launched in 2015, Exclusive is South Africa’s premier online
            shopping marketplace with an active customer base...
          </p>
        </div>
        <img
          src="https://pixabay.com/illustrations/man-reading-book-home-person-9534903/"
          alt="Shoppers"
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { value: "10.5k", label: "Sellers active on our site" },
          { value: "33k", label: "Monthly Product Sale", active: true },
          { value: "45.5k", label: "Customer active on our site" },
          { value: "25k", label: "Annual gross sale on our site" },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-md shadow ${
              stat.active ? "bg-red-500 text-white" : "bg-white"
            }`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team Members */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          {
            name: "Tom Cruise",
            role: "Founder & Chairman",
            img: "/team/tom.png",
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
          <div key={i} className="space-y-3">
            <img
              src={member.img}
              alt={member.name}
              className="w-48 h-48 object-cover mx-auto rounded-lg"
            />
            <div>
              <h4 className="font-bold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
              <div className="flex justify-center gap-4 mt-1 text-gray-500">
                <i className="fab fa-twitter" />
                <i className="fab fa-instagram" />
                <i className="fab fa-linkedin" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Services Cards */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[
          {
            title: "FREE AND FAST DELIVERY",
            subtitle: "Free delivery for all orders over $140",
            icon: "🚚",
          },
          {
            title: "24/7 CUSTOMER SERVICE",
            subtitle: "Friendly 24/7 customer support",
            icon: "📞",
          },
          {
            title: "MONEY BACK GUARANTEE",
            subtitle: "We return money within 30 days",
            icon: "💰",
          },
        ].map((service, i) => (
          <div key={i} className="p-6 rounded-md shadow-md bg-white">
            <div className="text-3xl mb-4">{service.icon}</div>
            <h4 className="font-bold">{service.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{service.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
