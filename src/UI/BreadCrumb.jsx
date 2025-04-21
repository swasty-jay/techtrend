import { Link } from "react-router-dom";

const Breadcrumb = ({ paths = [] }) => {
  return (
    <nav className="text-xs sm:text-sm text-gray-600 mb-6 font-semibold">
      {paths.map((path, index) => (
        <span key={index}>
          {index !== 0 && " / "}
          {path.to ? (
            <Link to={path.to} className="hover:underline capitalize">
              {path.label}
            </Link>
          ) : (
            <span className="text-black font-medium capitalize">
              {path.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
