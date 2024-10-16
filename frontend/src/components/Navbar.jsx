import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineYoutube, AiOutlinePlus } from "react-icons/ai"; // Import AiOutlinePlus icon
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import unknownUser from "../images/user.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, clearUserInfo, checkAuth } from "../Redux/userSlice";
import { searchVideos, addVideo } from "../Redux/videoSlice"; // Import addVideo action

const Navbar = ({ toggleSidebar }) => {
  const [userPic] = useState(unknownUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { userInfo, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  const handleLogout = async () => {
    await dispatch(signOutUser());
    dispatch(clearUserInfo());
    Cookies.remove("token");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchVideos(searchTerm));
    } else {
      alert("Please enter a search term");
    }
  };

  const handleAddVideo = async () => {
    const token = Cookies.get("token");
    if (!token) return alert("Please login to add a video.");

    const videoData = {
      title: "New Video", // Example video data
      description: "This is a new video.",
      url: "https://example.com/video.mp4",
    };

    try {
      await dispatch(addVideo(videoData));
      alert("Video added successfully!");
    } catch (error) {
      alert("Error adding video: " + error.message);
    }
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center fixed w-full top-0 left-0 z-50">
      {/* Left side - Logo and Hamburger */}
      <div className="flex items-center">
        <div className="text-gray-700 cursor-pointer" onClick={toggleSidebar}>
          <IoMenuOutline size={30} />
        </div>
        <Link to="/">
          <div className="flex items-center ml-4">
            <AiOutlineYoutube className="text-red-600" size={40} />
            <span className="text-xl font-semibold ml-2">
              Youtube<sup>NL</sup>
            </span>
          </div>
        </Link>
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

      {/* Right side - User, Add Video, and Options */}
      <div className="flex items-center space-x-4 relative z-50">
        {/* Add Video Button */}
        <Link to="/upload">
          <button
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-200 flex items-center justify-center"
            onClick={handleAddVideo}
          >
            <AiOutlinePlus size={24} /> {/* Plus Icon Button */}
          </button>
        </Link>

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
          <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-lg p-2">
            {!userInfo ? (
              <>
                <Link to="/login">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/channel">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                    Profile
                  </button>
                </Link>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                  {userInfo?.user?.name || "User"}
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                  onClick={handleLogout}
                >
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-l-full w-full focus:outline-none focus:ring focus:ring-red-300"
                />
                <button className="bg-gray-100 p-2 rounded-r-full hover:bg-gray-200 transition duration-200">
                  <IoSearchOutline size={24} />
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
