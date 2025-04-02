import React from "react";
import { setSearchQuery } from "../../Store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.search.query);
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="flex items-center bg-white p-3 rounded-full shadow-lg border border-gray-200">
        <FaSearch className="text-gray-400" />
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
