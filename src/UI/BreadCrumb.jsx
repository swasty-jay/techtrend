// src/components/Breadcrumb.jsx
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";

function Breadcrumb({ paths }) {
  return (
    <nav className="text-sm text-gray-500 flex items-center gap-2 mb-6">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <BiChevronRight size={16} />}
          {index < paths.length - 1 ? (
            <Link
              to={path.href}
              className="hover:text-gray-700 hover:underline transition"
            >
              {path.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{path.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumb;
