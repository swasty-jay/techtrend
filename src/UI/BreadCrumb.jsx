import { Link } from "react-router-dom";

const Breadcrumb = ({ paths = [] }) => {
  return (
    <nav className="text-xs sm:text-sm text-gray-600 mb-6 font-roboto">
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

// components/Breadcrumb.jsx
// import { Link, useLocation } from "react-router-dom";

// const Breadcrumb = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   return (
//     <nav className="text-sm text-gray-600 mb-4">
//       <ul className="flex items-center space-x-2">
//         <li>
//           <Link to="/" className="hover:underline text-red-500 font-medium">
//             Home
//           </Link>
//         </li>
//         {pathnames.map((value, index) => {
//           const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//           const isLast = index === pathnames.length - 1;

//           return (
//             <li key={to} className="flex items-center space-x-2">
//               <span>/</span>
//               {isLast ? (
//                 <span className="capitalize text-gray-900">{value}</span>
//               ) : (
//                 <Link
//                   to={to}
//                   className="capitalize hover:underline text-red-500"
//                 >
//                   {value}
//                 </Link>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// };

// export default Breadcrumb;
