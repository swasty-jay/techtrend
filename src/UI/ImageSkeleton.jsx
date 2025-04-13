import { useState } from "react";
import PropTypes from "prop-types";

const ImageSkeleton = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
      )}

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">
          Failed to load image
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
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
