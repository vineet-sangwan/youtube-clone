import React, { useState } from "react";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import unknownUser from "../images/user.jpg";

const Navbar = ({ toggleSidebar }) => {
  const [userPic] = useState(unknownUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Search term:", searchTerm);
    } else {
      alert("Please enter a search term");
    }
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center fixed w-full top-0 left-0 z-50">
      {/* Left side - Logo and Hamburger */}
      <div className="flex items-center">
        <div className="text-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <IoMenuOutline size={30} />
        </div>

        <div className="flex items-center ml-4">
          <AiOutlineYoutube className="text-red-600" size={40} />
          <span className="text-xl font-semibold ml-2">
            Youtube<sup>NL</sup>
          </span>
        </div>
      </div>

      {/* Center - Search bar */}
      <div className="hidden md:flex items-center space-x-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-red-300 w-64"
          />
          <button
            type="submit"
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-200 flex items-center justify-center"
          >
            <IoSearchOutline size={24} />
          </button>
          <button
            type="button"
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-200 flex items-center justify-center"
          >
            <MdOutlineKeyboardVoice size={24} />
          </button>
        </form>
      </div>

      {/* Right side - User and options */}
      <div className="flex items-center space-x-4 relative z-50">
        <BsThreeDotsVertical
          className="text-gray-700 cursor-pointer"
          size={24}
          onClick={toggleMenu}
        />
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

        {dropdownOpen && (
          <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-lg p-2 ">
            {!loggedIn ? (
              <>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                  Login
                </button>
              </>
            ) : (
              <>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                  John Doe
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                  Logout
                </button>
              </>
            )}
          </div>
        )}

        {menuOpen && (
          <div className="fixed top-16 right-0 p-4 w-full bg-white shadow-lg z-50 md:hidden">
            <div className="flex flex-col p-4">
              <div className="flex w-full mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-4 py-2 border border-gray-300 rounded-l-full w-full focus:outline-none focus:ring focus:ring-red-300"
                />
                <button className="bg-gray-100 p-2 rounded-r-full hover:bg-gray-200 transition duration-200">
                  <IoSearchOutline size={24} />
                </button>
              </div>

              <div className="flex items-center justify-evenly w-full mb-4">
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-200">
                  <MdOutlineKeyboardVoice size={24} />
                </button>
                <button className="relative" onClick={toggleDropdown}>
                  <img
                    src={userPic}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-gray-300"
                  />
                </button>
              </div>

              <div className="flex flex-col w-full space-y-2">
                <button className="w-full px-4 py-2 text-gray rounded-md ">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-gray rounded-md ">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
