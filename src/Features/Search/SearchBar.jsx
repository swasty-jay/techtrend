import React from "react";
import { setSearchQuery } from "../../Store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.search.query);
  return (
    <div className="    hidden sm:flex flex-1 max-w-md mx-4 ">
      <div className="flex items-center bg-white  rounded-full shadow-lg border border-gray-200">
        <FaSearch className=" ml-2 text-gray-400" />
        <input
          type="text"
          className="w-full ml-3 p-2 outline-none bg-transparent placeholder-gray-500"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SearchBar;
