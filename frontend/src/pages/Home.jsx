import React, { useEffect } from "react";
import Filter from "../components/Filter";
import VideoCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRandomVideos,
  fetchSubscribedVideos,
  fetchTrendingVideos,
} from "../Redux/videoSlice";
import { videoTags } from "../../Utils/Dummy";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const {
    videos = [],
    subscribedVideos = [],
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
  const videosToDisplay = type === "Subscriptions" ? subscribedVideos : videos;

  // Conditional class for ml-10 based on type
  const containerClass = `flex flex-col h-screen bg-gray-50 p-6 ${
    type === "trend" || type === "Subscriptions" ? "ml-10" : ""
  }`;

  return (
    <main className={containerClass}>
      {/* Filter section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Tags</h2>
        <Filter tags={videoTags} />
      </div>

      {/* Loading and Error handling */}
      {isLoading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!isLoading && !error && videosToDisplay.length === 0 && (
        <p>No videos available.</p>
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
