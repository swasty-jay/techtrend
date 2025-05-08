import React from "react";

const Error = ({ children }) => {
  return (
    <div className="text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-3 text-sm md:text-base font-medium font-sans text-center shadow-sm max-w-md mx-auto">
      {children}
    </div>
  );
};

export default Error;
