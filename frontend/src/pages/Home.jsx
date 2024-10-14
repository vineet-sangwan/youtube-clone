import React, { useEffect } from "react";
import Filter from "../components/Filter";
import VideoCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRandomVideos,
  fetchSubscribedVideos,
  fetchTrendingVideos,
  fetchVideosByTag, // Import the new action
} from "../Redux/videoSlice";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const {
    videos = [],
    subscribedVideos = [],
    searchResults = [],
    isLoading,
    error,
  } = useSelector((state) => state.videos);

  // Fetch videos based on type on component mount
  useEffect(() => {
    if (type === "random") {
      dispatch(fetchRandomVideos());
    } else if (type === "trend") {
      dispatch(fetchTrendingVideos());
    } else if (type === "Subscriptions") {
      dispatch(fetchSubscribedVideos());
    }
  }, [dispatch, type]);

  // Determine which videos to display
  const videosToDisplay =
    searchResults.length > 0
      ? searchResults
      : type === "Subscriptions"
      ? subscribedVideos
      : videos;

  // Extract unique tags from the videos to display
  const allTags = videosToDisplay.reduce((acc, video) => {
    video.tags.forEach((tag) => {
      acc.add(tag.trim());
    });
    return acc;
  }, new Set());

  // Convert Set back to array for the Filter component
  const uniqueTags = Array.from(allTags);

  // Conditional class for alignment based on type
  const containerClass = `flex flex-col h-screen bg-gray-50 p-4 md:p-6 lg:p-8 ${
    type === "trend" || type === "Subscriptions" ? "ml-1" : ""
  }`;

  // Handle tag click to fetch videos by the selected tag
  const handleTagClick = (tag) => {
    dispatch(fetchVideosByTag(tag)); // Dispatch action to fetch videos by tag
  };

  return (
    <main className={containerClass}>
      {/* Filter section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Tags</h2>
        <Filter tags={uniqueTags} onTagClick={handleTagClick} />{" "}
        {/* Pass the handler */}
      </div>

      {/* Loading and Error handling */}
      {isLoading && <p className="text-center">Loading videos...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!isLoading && !error && videosToDisplay.length === 0 && (
        <p className="text-center">No videos available.</p>
      )}

      {/* Video Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {videosToDisplay.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </section>
    </main>
  );
};

export default Home;
