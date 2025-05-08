import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ImageSkeleton = ({
  src,
  alt,
  className,
  height = "h-48",
  fallbackIcon = true,
  errorIcon = "📷",
  skeletonClassName = "",
  objectFit = "object-cover",
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  // Simulate a minimum loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [loaded]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setLoaded(true);
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Loader with shimmer effect */}
      {!loaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:400%_100%] ${skeletonClassName}`}
        ></div>
      )}

      {/* Actual Image (hidden until loaded) */}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`w-full ${height} ${objectFit} transition-all duration-500 ${
            loaded && isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Error Fallback */}
      {error && fallbackIcon && (
        <div
          className={`w-full ${height} flex items-center justify-center bg-gray-100 text-gray-400`}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">{errorIcon}</span>
            <span className="text-xs text-center px-4">
              Image not available
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

ImageSkeleton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
  fallbackIcon: PropTypes.bool,
  errorIcon: PropTypes.string,
  skeletonClassName: PropTypes.string,
  objectFit: PropTypes.string,
};

export default ImageSkeleton;
