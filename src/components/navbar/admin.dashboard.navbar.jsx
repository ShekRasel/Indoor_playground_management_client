import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "src/utils/helper";
import { FaUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export const AdminDashboardNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    removeToken();
    removeUser();
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-gray-200 w-full flex justify-end px-4 py-3 bg-darkBlue gap-4">
      <SearchInput />

      {/* Profile icon button */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="focus:outline-none flex items-center space-x-1 cursor-pointer border border-dashed border-green-500 p-2 rounded-full"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <FaUserCircle size={24} className="" />
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-10 w-52 bg-darkBlue rounded-md shadow-lg border border-gray z-50 py-4 px-2"
        >
          <Link
            to="/admin/dashboard/profile"
            className="flex items-center px-4 py-2 hover:bg-green-600 hover:text-white transition cursor-pointer"
            onClick={() => setDropdownOpen(false)}
          >
            <FaUser className="mr-2" /> Profile
          </Link>

          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 hover:bg-red-600 hover:text-white transition cursor-pointer border-t border-gray-700"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative text-gray-300">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-3 py-2 rounded-md bg-darkBlue border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );
};
