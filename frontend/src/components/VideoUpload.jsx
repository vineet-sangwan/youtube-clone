import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../Redux/videoSlice"; // Import the action
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // Accessing user information from the Redux state
  const user = useSelector((state) => state.user.userInfo); // Correctly accessing userInfo
  const userId = user ? user.user._id : null; // Ensure userId is set correctly
  console.log(userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all fields are filled
    if (!title || !desc || !imgUrl || !videoUrl || !tags || !userId) {
      return alert("Please fill in all fields.");
    }
    const videoData = {
      title,
      desc,
      imgUrl,
      videoUrl,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to array
      user: userId,
    };

    const token = Cookies.get("token");
    if (!token) {
      return alert("You need to login to upload a video.");
    }

    setLoading(true);

    try {
      await dispatch(addVideo(videoData));
      alert("Video uploaded successfully!");
      navigate("/"); // Redirect after successful upload
    } catch (error) {
      alert("Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-12 mb-5">
      <h2 className="text-2xl font-bold mb-6">Upload a Video</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            placeholder="Enter video title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            placeholder="Enter video description"
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="imgUrl" className="block text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Video URL */}
        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-gray-700">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            placeholder="Enter video URL"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300"
            placeholder="Enter tags, separated by commas"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          } transition duration-200`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
