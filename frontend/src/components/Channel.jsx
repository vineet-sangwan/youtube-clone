import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelById, updateChannel } from "../Redux/channel";
import {
  subscribeToVideo,
  unsubscribeFromVideo,
  checkSubscription,
} from "../Redux/userInfo";
import Cookies from "js-cookie";

const ChannelComponent = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const user = useSelector((state) => state.videoInfo);
  const { currentChannel, isLoading, error } = channels;
  const isSubscribed = useSelector((state) => state.videoInfo.isSubscribed);

  const [name, setName] = useState(currentChannel?.name || "");
  const [bannerImage, setBannerImage] = useState(
    currentChannel?.bannerImage || ""
  );
  const [profileImage, setProfileImage] = useState(
    currentChannel?.profileImage || ""
  );

  // State for toggling the update form visibility
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (channelId) {
      dispatch(fetchChannelById(channelId));
      dispatch(checkSubscription(channelId));
    }
  }, [channelId, dispatch]);

  useEffect(() => {
    if (currentChannel) {
      setName(currentChannel.name);
      setBannerImage(currentChannel.bannerImage);
      setProfileImage(currentChannel.profileImage);
    }
  }, [currentChannel]);

  const handleSubscribe = async () => {
    if (user) {
      const response = await dispatch(subscribeToVideo(currentChannel._id));
      if (response.payload.success) {
        dispatch(checkSubscription(channelId));
      }
    }
  };

  const handleUnsubscribe = async () => {
    if (user) {
      const response = await dispatch(unsubscribeFromVideo(currentChannel._id));
      if (response.payload.success) {
        dispatch(checkSubscription(channelId));
      }
    }
  };

  const handleUpdateChannel = async (e) => {
    e.preventDefault();
    const channelData = { name, bannerImage, profileImage };
    const response = await dispatch(
      updateChannel({ id: channelId, channelData })
    );
    if (response.error) {
      console.error("Update failed:", response.error);
    } else {
      console.log("Update successful:", response.payload);
      setShowUpdateForm(false); // Hide the form after successful update
    }
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
          {currentChannel?.name || "Internshala"}
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
              {currentChannel?.name || "Internshala"}
            </h2>
            <p className="text-gray-600">
              {`${currentChannel?.subscribers || "0"} subscribers • ${
                currentChannel?.videos?.length || "0"
              } videos`}
            </p>
          </div>
        </div>
        <button
          onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
          className={`px-4 py-2 rounded ${
            isSubscribed ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>

      {/* Update Channel Button */}
      <button
        onClick={() => setShowUpdateForm(!showUpdateForm)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        {showUpdateForm ? "Hide Update Form" : "Update Channel"}
      </button>

      {/* Update Channel Form - Conditional Rendering */}
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

      {/* Navigation Tabs */}
      <nav className="mt-6 border-b border-gray-200">
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-gray-600">
          <li>
            <NavLink
              to="#"
              className="text-blue-500 pb-2 border-b-2 border-blue-500"
            >
              Videos
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="hover:text-blue-500">
              Shorts
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="hover:text-blue-500">
              Playlists
            </NavLink>
          </li>
          <li>
            <NavLink to="#" className="hover:text-blue-500">
              Community
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Video Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {currentChannel?.videos?.map((video) => (
          <div
            key={video._id}
            className="bg-white shadow-md rounded overflow-hidden"
          >
            <div
              style={{
                backgroundImage: `url(${
                  video.bgImage || "https://via.placeholder.com/200"
                })`,
                height: "200px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-32 object-cover"
            ></div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{video.name}</h3>
              <p className="text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelComponent;
