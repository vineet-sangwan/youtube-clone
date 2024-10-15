// ChannelComponent.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ChannelComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submit
  const handleCreateChannel = (e) => {
    e.preventDefault();

    // Create a new channel object
    const newChannel = {
      id: Date.now(),
      name: channelName,
      bgImage,
      description,
    };

    // Update state to add new channel
    setChannels([...channels, newChannel]);

    // Clear form fields and hide form
    setChannelName("");
    setBgImage("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {/* NavLink to open form */}
      <NavLink
        to="#"
        onClick={() => setShowForm(true)}
        className="text-blue-500 underline"
      >
        Create Channel
      </NavLink>

      {/* Conditional rendering for the form */}
      {showForm && (
        <form
          onSubmit={handleCreateChannel}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
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
              Background Image URL
            </label>
            <input
              type="text"
              placeholder="Enter Background Image URL"
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
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

      {/* Display the list of created channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="bg-white shadow-md rounded overflow-hidden"
          >
            <img
              src={channel.bgImage}
              alt="Channel Background"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{channel.name}</h3>
              <p className="text-gray-600">{channel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelComponent;
