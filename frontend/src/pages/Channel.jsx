import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChannel, fetchChannels, deleteChannel } from "../Redux/channel"; // Adjust the import path as necessary
import { NavLink } from "react-router-dom";

const ChannelComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user); // Get user info from Redux store
  const { channels, isLoading, error } = useSelector((state) => state.channels); // Get channels from Redux store
  const [showForm, setShowForm] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState(""); // New state for banner image
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch existing channels when the component mounts
    dispatch(fetchChannels());
  }, [dispatch]);

  // Handle form submit to create a new channel
  const handleCreateChannel = (e) => {
    e.preventDefault();

    // Create a new channel object with userId from userInfo
    const newChannel = {
      userId: userInfo._id, // Access userId from userInfo
      name: channelName,
      description,
      profileImage, // Use profileImage for channel profile
      bannerImage, // Add bannerImage field
      subscribers: [], // Initialize subscribers as an empty array
    };

    // Dispatch action to add the new channel
    dispatch(addChannel(newChannel))
      .unwrap()
      .then(() => {
        // Clear form fields and hide form after successful creation
        setChannelName("");
        setProfileImage("");
        setBannerImage(""); // Clear banner image input
        setDescription("");
        setShowForm(false);
      })
      .catch((err) => {
        console.error("Failed to create channel:", err);
      });
  };

  // Handle channel deletion
  const handleDeleteChannel = (channelId) => {
    dispatch(deleteChannel(channelId))
      .unwrap()
      .then(() => {
        console.log("Channel deleted successfully");
      })
      .catch((err) => {
        console.error("Failed to delete channel:", err);
      });
  };

  return (
    <div className="p-6">
      {/* Button to create a new channel */}
      <button
        onClick={() => setShowForm((prev) => !prev)} // Toggle the form display
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {showForm ? "Cancel" : "Create Channel"}
      </button>

      {/* Conditional rendering for the form */}
      {showForm && (
        <form
          onSubmit={handleCreateChannel}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-xl font-bold mb-4">Create Your Channel</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Channel Name
            </label>
            <input
              type="text"
              placeholder="Enter Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              placeholder="Enter Profile Image URL"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Banner Image URL (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter Banner Image URL"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Channel Description
            </label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Channel
          </button>
        </form>
      )}

      {/* Display channels */}
      {channels.length === 0 ? (
        <p className="text-gray-500">No channels created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {channels.map((channel) => (
            <div
              key={channel._id} // Use channel._id for unique keys
              className="bg-white shadow-md rounded overflow-hidden"
            >
              <NavLink to={`/userChannel/${channel._id}`}>
                <img
                  src={channel.profileImage} // Display profile image
                  alt="Channel Background"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{channel.name}</h3>
                  <p className="text-gray-600">{channel.description}</p>
                  <p className="text-gray-500">
                    Subscribers: {channel.subscribers.length}
                  </p>
                </div>
              </NavLink>
              <button
                onClick={() => handleDeleteChannel(channel._id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default ChannelComponent;
