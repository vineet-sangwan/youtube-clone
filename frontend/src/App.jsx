import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if the current path is the homepage

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar at the top */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content area with Sidebar and dynamic content */}
      <div className="flex flex-grow mt-16 overflow-hidden">
        {/* Sidebar on the left with dynamic width */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-56" : "w-16"
          }`}
        >
          <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content area where routes will be rendered */}
        <div
          className={`flex-grow transition-all duration-300  ${
            sidebarOpen
              ? "ml-2 lg:ml-1 lg:mt-4"
              : isHomePage
              ? " lg:ml-1"
              : " mt-2"
          } overflow-auto`}
        >
          <Outlet /> {/* This renders the specific route content */}
        </div>
      </div>
    </div>
  );
};

export default App;
