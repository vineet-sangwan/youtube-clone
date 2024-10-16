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
          className={`transition-all duration-300 bg-white shadow-lg ${
            sidebarOpen ? "w-56 md:w-20" : "w-20 md:w-16"
          } h-full`}
        >
          <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content area where routes will be rendered */}
        <div
          className={`flex-grow transition-all duration-300 bg-white shadow-md p-4 ${
            sidebarOpen ? "ml-4 md:ml-40" : "ml-5 md:ml-4"
          } overflow-auto rounded-lg`}
        >
          {/* Container for content */}
          <div className="max-w-8xl mx-auto px-4">
            <Outlet /> {/* This renders the specific route content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
