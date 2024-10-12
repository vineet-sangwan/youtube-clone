import React from "react";
import { Link } from "react-router-dom";

// Function to calculate the relative time
const timeAgo = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - new Date(timestamp)) / 1000);
  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  return "Just now";
};

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Thumbnail */}
        <img
          src={video.imgUrl} // Use imgUrl from your video data
          alt={video.title}
          className="w-full h-48 object-cover"
        />

        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {video.views} views • {timeAgo(video.createdAt)}{" "}
            {/* Show views and relative time */}
          </p>
          <div className="flex items-center mt-2">
            <img
              src={video.uploaderAvatar || "default-avatar.png"} // Placeholder for avatar
              alt={video.username} // Assuming you have a username field
              className="w-8 h-8 rounded-full mr-2"
            />
            <p className="text-sm text-gray-800">{video.name}</p>{" "}
            {/* Display username as channel name */}
          </div>
          <p className="text-xs text-gray-500 mt-2">{video.desc}</p>{" "}
          {/* Display description */}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
