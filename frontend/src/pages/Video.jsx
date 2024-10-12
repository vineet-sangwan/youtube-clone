import React, { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import Recommendation from "../components/Recommendation";

const Video = () => {
  // Static video data
  const video = {
    title: "Sample Video Title",
    views: "1,234 views",
    createdAt: "1 day ago",
    likes: 100,
    dislikes: 10,
    desc: "This is a sample description for the video.",
    videoUrl: "path_to_your_video.mp4", // Replace with the actual video path
  };

  const channel = {
    img: "path_to_channel_image.jpg", // Replace with the actual channel image
    name: "Channel Name",
    subscribers: "10K subscribers",
  };

  // Static comments data
  const [comments, setComments] = useState([
    { id: 1, text: "Great video!" },
    { id: 2, text: "Very informative, thanks!" },
    { id: 3, text: "I learned a lot from this!" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 min-h-screen">
      {/* Left Side: Video Section */}
      <div className="flex flex-col items-center p-4 w-full lg:w-[60%] lg:max-w-[875px] mx-auto">
        <div className="videoPostSection w-full bg-gray-800 rounded-lg shadow-lg mb-4">
          {/* Video Container */}
          <div className="video_youtube">
            <video
              controls
              autoPlay
              className="w-full rounded-lg shadow-md border-2 border-gray-700 mb-4"
              src={video.videoUrl}
            >
              <source src={video.videoUrl} type="video/mp4" />
              <source src={video.videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Title and Description */}
          <div className="p-4">
            <h2 className="text-white text-2xl font-semibold mb-2">
              {video.title}
            </h2>
            <p className="text-gray-300 mb-4">{video.desc}</p>
            <span className="text-gray-500">
              {video.views} • {video.createdAt}
            </span>
          </div>

          {/* Additional Options (like, share buttons) */}
          <div className="flex justify-between p-4 border-t border-gray-700">
            <button className="flex items-center text-gray-300 hover:text-blue-500">
              <FaThumbsUp className="mr-1" />
              {video.likes}
            </button>
            <button className="flex items-center text-gray-300 hover:text-red-500">
              <FaThumbsDown className="mr-1" />
              {video.dislikes}
            </button>
            <button className="flex items-center text-gray-300 hover:text-green-500">
              <FaShareAlt className="mr-1" /> Share
            </button>
            <button className="flex items-center text-gray-300 hover:text-yellow-500">
              <FaBookmark className="mr-1" /> Save
            </button>
          </div>

          {/* Channel Info */}
          <div className="flex items-center justify-between p-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={channel.img}
                alt="Channel"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-white">{channel.name}</h2>
                <span className="text-gray-500">{channel.subscribers}</span>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="w-full bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-white text-xl mb-2">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-700 bg-gray-900 text-white"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Comment
            </button>
          </form>
          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="text-gray-300">
                {comment.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Recommendations Section */}
      <div className="hidden lg:block lg:w-[40%] p-4">
        <h2 className="text-white text-xl font-semibold mb-4">
          Recommendations
        </h2>
        <Recommendation tags="example-tag" />
        {/* Pass the tags for filtering */}
      </div>
    </div>
  );
};

export default Video;
