import React, { useState } from "react";

const Filter = ({ tags, onTagClick }) => {
  const [activeTag, setActiveTag] = useState("");

  const handleFilterClick = (tag) => {
    setActiveTag(tag); // Update the active tag
    onTagClick(tag); // Call the function to fetch videos by the selected tag
  };

  return (
    <div
      className="overflow-x-auto py-2 scrollbar-hidden"
      style={{ maxWidth: "100%", whiteSpace: "nowrap" }}
    >
      <div className="flex space-x-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTag === tag
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700"
            } hover:bg-red-300 transition duration-200`}
            onClick={() => handleFilterClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
