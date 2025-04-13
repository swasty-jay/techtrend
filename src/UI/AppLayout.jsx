// src/components/layout/AppLayout.jsx
import React from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 mt-20 px-4 sm:px-7 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/*  Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
