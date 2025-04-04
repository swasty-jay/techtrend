import { useState } from "react";

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
        className={`w-full h-auto max-h-48 object-contain rounded-lg transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageSkeleton;
