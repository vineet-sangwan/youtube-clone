import React from "react";
import { IoHomeOutline, IoVideocamOutline } from "react-icons/io5";
import {
  MdOutlineSubscriptions,
  MdOutlineHistory,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
  MdOutlineSettings,
  MdFeedback,
} from "react-icons/md";
import { FaMoon, FaQuestionCircle } from "react-icons/fa";
import { GrChannel } from "react-icons/gr";
import { RiPlayList2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen }) => {
  return (
    <div
      className={`bg-white text-gray-800 h-screen py-4 transition-all duration-300 shadow-lg fixed z-40 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Top Navigation */}
      <div className="space-y-2 flex flex-col">
        <Link to="/">
          <SidebarOption Icon={IoHomeOutline} label="Home" isOpen={isOpen} />
        </Link>
        <Link to="/trend">
          <SidebarOption
            Icon={IoVideocamOutline}
            label="Trending"
            isOpen={isOpen}
          />
        </Link>
        <Link to="/Subscriptions">
          <SidebarOption
            Icon={MdOutlineSubscriptions}
            label="Subscriptions"
            isOpen={isOpen}
          />
        </Link>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Middle Navigation */}
      <div className="space-y-2 flex flex-col">
        <Link to="/userChannel">
          <SidebarOption
            Icon={GrChannel}
            label="Your Channel"
            isOpen={isOpen}
          />
        </Link>
        <SidebarOption
          Icon={MdOutlineHistory}
          label="History"
          isOpen={isOpen}
        />
        <SidebarOption
          Icon={RiPlayList2Fill}
          label="Playlists"
          isOpen={isOpen}
        />
        <SidebarOption
          Icon={MdOutlineVideoLibrary}
          label="Library"
          isOpen={isOpen}
        />
        <SidebarOption
          Icon={MdOutlineWatchLater}
          label="Watch Later"
          isOpen={isOpen}
        />
      </div>

      <hr className="border-gray-300 my-2" />

      {/* Bottom Section */}
      <div className="mt-auto space-y-2 flex flex-col">
        <SidebarOption
          Icon={MdOutlineSettings}
          label="Settings"
          isOpen={isOpen}
        />
        <SidebarOption Icon={FaQuestionCircle} label="Help" isOpen={isOpen} />
        <SidebarOption
          Icon={MdFeedback}
          label="Send Feedback"
          isOpen={isOpen}
        />
        <SidebarOption Icon={FaMoon} label="Dark Mode" isOpen={isOpen} />
      </div>
    </div>
  );
};

// Sidebar Option Component
const SidebarOption = ({ Icon, label, isOpen }) => {
  return (
    <div
      className={`group flex items-center ${
        isOpen ? "justify-start space-x-2" : "justify-center"
      } p-2 hover:bg-gray-200 cursor-pointer transition-colors duration-200`}
    >
      <Icon className="text-gray-700 group-hover:text-gray-900" size={24} />
      {isOpen && (
        <span className="text-gray-700 group-hover:text-gray-900 text-base transition-colors duration-200">
          {label}
        </span>
      )}
    </div>
  );
};

export default SideBar;
