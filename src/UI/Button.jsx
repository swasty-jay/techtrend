import React from "react";

export default function Button({
  onClick,
  children,
  variant = "primary",
  className = "",
}) {
  return (
    <button
      className={`custom-button ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
