import React, { useState } from "react";
import SideBar from "../components/SideBar"; // Sidebar component you already created
import Filter from "../components/Filter"; // Filter (categories) component
import Navbar from "../components/Navbar"; // Navbar component

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Video categories (tags)
  const videoTags = [
    "All",
    "Music",
    "Sports",
    "Gaming",
    "News",
    "Technology",
    "Education",
    "Health",
    "Travel",
    "Food",
    "DIY",
    "Fashion",
    "Science",
    "Vlogs",
    "Comedy",
    "Motivational",
    "Fitness",
    "Animals",
    "Nature",
    "Art",
    "Documentary",
    "Short Films",
    "Reviews",
    "Tutorials",
    "Lifestyle",
    "Photography",
    "Parenting",
    "Politics",
    "Finance",
    "Culture",
    "Self-Improvement",
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content area with Sidebar and Videos */}
      <div className="flex flex-grow mt-16 overflow-hidden">
        {/* Sidebar with dynamic width */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-56" : "w-16"
          }`}
        >
          <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content area */}
        <div
          className={`flex-grow p-4 transition-all duration-300 ${
            sidebarOpen ? "ml-52 lg:ml-32" : "ml-16 lg:ml-8"
          } overflow-auto`}
        >
          {/* Filter component (Tags) */}
          <div className="mb-4">
            <Filter tags={videoTags} />
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Video Cards */}
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="bg-gray-200 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                Video Card {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
