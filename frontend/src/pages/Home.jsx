import React, { useEffect } from "react";
import Filter from "../components/Filter";
import VideoCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomVideos } from "../Redux/videoSlice";
import { videoTags } from "../../Utils/Dummy";

const Home = () => {
  const dispatch = useDispatch();
  const { videos, isLoading, error } = useSelector((state) => state.videos); // Access video data from the Redux store
  // Fetch subscribed videos on component mount
  useEffect(() => {
    dispatch(fetchRandomVideos());
  }, [dispatch]);

  return (
    <main className="flex flex-col h-screen bg-gray-50 p-6">
      {/* Filter section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Tags</h2>
        <Filter tags={videoTags} />
      </div>

      {/* Loading and Error handling */}
      {isLoading && <p>Loading videos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Video Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {videos &&
          videos.map((video) => <VideoCard key={video._id} video={video} />)}
      </section>
    </main>
  );
};

export default Home;
