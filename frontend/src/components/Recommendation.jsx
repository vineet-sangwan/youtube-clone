import React, { useEffect } from "react";
import VideoCard from "./Card"; // Import your VideoCard component
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomVideos } from "../Redux/videoSlice"; // Import the fetch action

const Recommendation = () => {
  const dispatch = useDispatch();
  const {
    videos = [],
    isLoading,
    error,
  } = useSelector((state) => state.videos);

  // Fetch random videos on component mount
  useEffect(() => {
    dispatch(fetchRandomVideos());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Loading and Error handling */}
      {isLoading && <p className="text-center">Loading videos...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!isLoading && !error && videos.length === 0 && (
        <p className="text-center">No videos available.</p>
      )}

      {/* Video Cards */}
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default Recommendation;
