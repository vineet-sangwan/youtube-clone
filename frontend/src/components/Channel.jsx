import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelById,
  updateChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../Redux/channel";
import { fetchVideosByUser } from "../Redux/videoSlice"; // Import fetchVideosByUser action

const ChannelComponent = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const { currentChannel, isLoading, error } = channels;
  const videos = useSelector((state) => state.videos.userVideos); // Get videos state
  console.log(videos);

  const [name, setName] = useState(currentChannel?.name || "");
  const [bannerImage, setBannerImage] = useState(
    currentChannel?.bannerImage || ""
  );
  const [profileImage, setProfileImage] = useState(
    currentChannel?.profileImage || ""
  );
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (channelId) {
      dispatch(fetchChannelById(channelId));
    }
  }, [channelId, dispatch]);

  useEffect(() => {
    if (currentChannel) {
      setName(currentChannel.name);
      setBannerImage(currentChannel.bannerImage);
      setProfileImage(currentChannel.profileImage);
      setIsSubscribed(currentChannel.subscribers?.includes("userId"));

      // Fetch videos for the current channel's userId
      if (currentChannel.userId) {
        dispatch(fetchVideosByUser(currentChannel.userId));
      }
    }
  }, [currentChannel, dispatch]);

  const handleUpdateChannel = async (e) => {
    e.preventDefault();
    const channelData = { name, bannerImage, profileImage };
    const response = await dispatch(
      updateChannel({ id: channelId, channelData })
    );
    if (response.error) {
      console.error("Update failed:", response.error);
    } else {
      dispatch(fetchChannelById(channelId)); // Refresh channel data after updating
      setShowUpdateForm(false);
    }
  };

  const handleSubscribe = async () => {
    const response = await dispatch(subscribeToChannel(channelId));
    if (!response.error) {
      setIsSubscribed(true);
    }
    dispatch(fetchChannelById(channelId)); // Refresh channel data after subscribing
  };

  const handleUnsubscribe = async () => {
    const response = await dispatch(unsubscribeFromChannel(channelId));
    if (!response.error) {
      setIsSubscribed(false);
    }
    dispatch(fetchChannelById(channelId)); // Refresh channel data after unsubscribing
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 md:p-6">
      {/* Top Banner */}
      <div className="relative h-40 md:h-64 flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src={
              currentChannel?.bannerImage ||
              "https://via.placeholder.com/1500x400"
            }
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center">
          {currentChannel?.name || "Channel Name"}
        </div>
      </div>
      {/* Channel Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
          <img
            src={
              currentChannel?.profileImage || "https://via.placeholder.com/100"
            }
            alt="Logo"
            className="rounded-full w-16 h-16 md:w-20 md:h-20"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">
              {currentChannel?.name || "Channel Name"}
            </h2>
            <p className="text-gray-600">
              {`${currentChannel?.subscribers?.length || "0"} subscribers • ${
                videos.length || "0"
              } videos`}
            </p>
            {currentChannel?.subscribers?.length ? (
              <button
                onClick={handleUnsubscribe}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Unsubscribe
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Subscribe
              </button>
            )}
            <p className="mt-2 text-gray-700">
              {currentChannel?.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
      {/* Update Channel Button */}
      <button
        onClick={() => setShowUpdateForm(!showUpdateForm)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        {showUpdateForm ? "Hide Update Form" : "Update Channel"}
      </button>
      {/* Update Channel Form */}
      {showUpdateForm && (
        <form
          onSubmit={handleUpdateChannel}
          className="mt-6 bg-gray-100 p-4 rounded shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">Update Channel</h3>
          <div className="mb-4">
            <label className="block mb-1">Channel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Banner Image URL</label>
            <input
              type="url"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Profile Image URL</label>
            <input
              type="url"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Channel
          </button>
        </form>
      )}
      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id}>
            <div className="bg-white shadow-md rounded overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${
                    video.imgUrl || "https://via.placeholder.com/300x200"
                  })`,
                }}
                className="bg-cover bg-center h-40"
              ></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-gray-600">{video.views} views</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelComponent;
