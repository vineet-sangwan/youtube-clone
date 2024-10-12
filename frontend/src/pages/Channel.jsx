import React from "react";
import { FaUser, FaThumbsUp } from "react-icons/fa";

const ChannelPage = () => {
  const channel = {
    name: "Channel Name",
    subscribers: "10K subscribers",
    backgroundImage: "path_to_background_image.jpg", // Replace with your background image path
    profileImage: "path_to_profile_image.jpg", // Replace with your profile image path
  };

  const sampleVideos = [
    {
      title: "Sample Video 1",
      description: "This is a sample description for video 1.",
      views: "1,234 views",
      uploaded: "1 week ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+1", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 2",
      description: "This is a sample description for video 2.",
      views: "2,345 views",
      uploaded: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+2", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 3",
      description: "This is a sample description for video 3.",
      views: "3,456 views",
      uploaded: "3 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+3", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 2",
      description: "This is a sample description for video 2.",
      views: "2,345 views",
      uploaded: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+2", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 3",
      description: "This is a sample description for video 3.",
      views: "3,456 views",
      uploaded: "3 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+3", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 2",
      description: "This is a sample description for video 2.",
      views: "2,345 views",
      uploaded: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+2", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 3",
      description: "This is a sample description for video 3.",
      views: "3,456 views",
      uploaded: "3 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+3", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    {
      title: "Sample Video 2",
      description: "This is a sample description for video 2.",
      views: "2,345 views",
      uploaded: "2 weeks ago",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Sample+Video+2", // Placeholder thumbnail
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
    },
    // Add more sample videos as needed
  ];

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Background Image Section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{ backgroundImage: `url(${channel.backgroundImage})` }}
      >
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-50px]">
          <img
            src={channel.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Channel Info */}
      <div className="flex flex-col items-center mt-16 text-center">
        <h1 className="text-white text-4xl font-bold">{channel.name}</h1>
        <span className="text-gray-400 text-lg">{channel.subscribers}</span>
        <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300">
          Subscribe
        </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around items-center mt-6 text-white">
        <div className="flex flex-col items-center">
          <FaUser className="text-3xl mb-1" />
          <span>100 Videos</span>
        </div>
        <div className="flex flex-col items-center">
          <FaThumbsUp className="text-3xl mb-1" />
          <span>1,200 Likes</span>
        </div>
        {/* Add more stats as needed */}
      </div>

      {/* Video List Section */}
      <div className="flex flex-wrap justify-center mt-6 mb-10">
        {sampleVideos.map((video, index) => (
          <div
            key={index}
            className="bg-gray-800 m-4 p-4 rounded-lg shadow-lg w-80 hover:shadow-xl transition-shadow duration-300"
          >
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 rounded-lg mb-2 object-cover"
              />
              <h2 className="text-white text-lg font-semibold">
                {video.title}
              </h2>
              <p className="text-gray-400">{video.description}</p>
              <div className="flex justify-between text-gray-500 mt-2">
                <span>{video.views}</span>
                <span>{video.uploaded}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
