import { useState } from "react";
import PropTypes from "prop-types";

const ImageSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton Loader (shows when image is loading) */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
      )}

      {/* Actual Image (hidden until loaded) */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

ImageSkeleton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
ImageSkeleton.defaultProps = {
  className: "",
};
export default ImageSkeleton;
