import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="py-60 text-3xl font-bold text-center">
      <h2 className=" text-amber-300">Oops! Page Not Found!!</h2>
      <button className="bg-gray-800 text-white text-sm px-4 py-1 rounded-md">
        {" "}
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

export default NotFound;
