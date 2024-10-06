import React, { useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import unknownUser from "../images/user.jpg";

const Navbar = () => {
  const [userPic] = useState(unknownUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Static state to simulate login

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left side - Logo and Hamburger */}
      <div className="flex items-center">
        {/* Hamburger menu */}
        <div
          className="text-gray-700 cursor-pointer md:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <IoCloseOutline size={30} />
          ) : (
            <IoMenuOutline size={30} />
          )}
        </div>

        {/* Logo */}
        <div className="flex items-center ml-4">
          <AiOutlineYoutube className="text-red-600" size={40} />
          <span className="text-xl font-semibold ml-2">
            Youtube<sup>NL</sup>
          </span>
        </div>
      </div>

      {/* Center - Search bar */}
      <div className="hidden md:flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-red-300 w-64"
        />
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <IoSearchOutline size={28} />
        </button>
        <button className="ml-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <MdOutlineKeyboardVoice size={24} />
        </button>
      </div>

      {/* Right side - User and options */}
      <div className="flex items-center space-x-4 relative">
        <BsThreeDotsVertical
          className="text-gray-700 hidden md:block"
          size={24}
        />

        {/* Image Button in Navbar */}
        <button
          className="focus:outline-none relative"
          onClick={toggleDropdown}
        >
          <img
            src={userPic}
            alt="User"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </button>

        {/* Dropdown Menu (hidden image on small screens) */}
        {dropdownOpen && (
          <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-lg p-2">
            {!loggedIn ? (
              <>
                {/* Profile option (no image in small screens) */}
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Login
                </button>
              </>
            ) : (
              <>
                {/* Username and Logout (no image on small screens) */}
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  John Doe {/* Static username */}
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-10 md:hidden">
          <div className="flex flex-col items-center p-4">
            {/* Search bar for mobile */}
            <div className="flex w-full mb-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border border-gray-300 rounded-l-full w-full"
              />
              <button className="bg-gray-100 p-2 rounded-r-full hover:bg-gray-200">
                <IoSearchOutline size={28} />
              </button>
            </div>

            {/* Align microphone, three dots, and user image in one row */}
            <div className="flex items-center space-x-4">
              <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <MdOutlineKeyboardVoice size={24} />
              </button>

              <BsThreeDotsVertical size={24} className="text-gray-700" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
