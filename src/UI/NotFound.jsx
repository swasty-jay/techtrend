import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";

const NotFound = () => {
  return (
    <>
      <Breadcrumb paths={[{ label: "Home", to: "/" }, { label: "404" }]} />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-8xl font-sans text-gray-800">404 Page Not Found</h1>
        <p className="mt-10 text-lg text-gray-600">
          Your Visited Page Not Found. You May Go Back Home
        </p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Back To Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;
