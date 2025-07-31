import React, { useState } from "react";
import logo from "./images/logo.png";
import { Link } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <Link to="/" className="text-white font-bold text-lg">
          Food Rescue
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white items-center">
          <li>
            <Link
              to="/"
              className="hover:bg-orange-500 px-4 py-2 rounded-md transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/topdonors"
              className="hover:bg-orange-500 px-4 py-2 rounded-md transition duration-300"
            >
              Top Donors
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md transition duration-300"
            >
              Register / Login
            </Link>
          </li>
          <li>
            <button className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-md transition duration-300">
              Donate Rs.
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-800 text-white space-y-4 px-6 py-4`}
      >
        <li>
          <Link
            to="/"
            className="block hover:bg-orange-500 px-4 py-2 rounded-md transition duration-300"
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/topdonors"
            className="block hover:bg-orange-500 px-4 py-2 rounded-md transition duration-300"
            onClick={closeMenu}
          >
            Top Donors
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="block bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md transition duration-300"
            onClick={closeMenu}
          >
            Register / Login
          </Link>
        </li>
        <li>
          <button
            className="block bg-red-600 hover:bg-red-500 px-6 py-2 rounded-md transition duration-300"
            onClick={closeMenu}
          >
            Donate Rs.
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
