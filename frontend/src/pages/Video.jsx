import React, { useEffect, useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import Recommendation from "../components/Recommendation";
import Comments from "../components/Comments";
import {
  dislikeVideo,
  likeVideo,
  subscribeToVideo,
  unsubscribeFromVideo,
  getUser,
} from "../Redux/userInfo.js";
import { getVideo } from "../Redux/videoSlice.js";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

const Video = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.user);
  const { currentVideo, loading, error } = useSelector((state) => state.videos);
  const channelOwner = useSelector((state) => state.videoInfo.user);
  const videoId = currentVideo ? currentVideo._id : null;
  const userID = currentVideo ? currentVideo.userId : null;

  // Local state for subscription status
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.user && userInfo.user.subscribedUsers) {
      setIsSubscribed(userInfo.user.subscribedUsers.includes(userID));
    }
  }, [userInfo, userID]);

  useEffect(() => {
    dispatch(getVideo(id)); // Fetch the video by ID
  }, [dispatch, id]);

  useEffect(() => {
    if (userID) {
      dispatch(getUser(userID)); // Fetch user data when userId changes
    }
  }, [dispatch, userID]);

  const handleLike = async () => {
    await dispatch(likeVideo(videoId));
    dispatch(getVideo(id)); // Refetch video to get updated likes
  };

  const handleDislike = async () => {
    await dispatch(dislikeVideo(videoId));
    dispatch(getVideo(id)); // Refetch video to get updated dislikes
  };

  const handleSubscribe = async () => {
    await dispatch(subscribeToVideo(userID));
    setIsSubscribed(true); // Update local state immediately
  };

  const handleUnsubscribe = async () => {
    await dispatch(unsubscribeFromVideo(userID));
    setIsSubscribed(false); // Update local state immediately
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentVideo) return <div>No video found.</div>;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center p-4 w-full lg:w-[60%] lg:max-w-[875px] mx-auto">
        <div className="videoPostSection w-full bg-gray-800 rounded-lg shadow-lg mb-4">
          <div className="video_youtube">
            <video
              controls
              autoPlay
              className="w-full rounded-lg shadow-md border-2 border-gray-700 mb-4"
              src={currentVideo.videoUrl}
            >
              <source src={currentVideo.videoUrl} type="video/mp4" />
              <source src={currentVideo.videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="p-4">
            <h2 className="text-white text-2xl font-semibold mb-2">
              {currentVideo.title}
            </h2>
            <p className="text-gray-300 mb-4">{currentVideo.desc}</p>
            <span className="text-gray-500">
              {currentVideo.views} • {format(currentVideo.createdAt)}
            </span>
          </div>

          <div className="flex justify-between p-4 border-t border-gray-700">
            <button
              onClick={handleLike}
              className="flex items-center text-gray-300 hover:text-blue-500"
            >
              <FaThumbsUp className="mr-1" />
              {currentVideo.likes?.length}
            </button>
            <button
              onClick={handleDislike}
              className="flex items-center text-gray-300 hover:text-red-500"
            >
              <FaThumbsDown className="mr-1" />
              {currentVideo.dislikes?.length}
            </button>
            <button className="flex items-center text-gray-300 hover:text-green-500">
              <FaShareAlt className="mr-1" /> Share
            </button>
            <button className="flex items-center text-gray-300 hover:text-yellow-500">
              <FaBookmark className="mr-1" /> Save
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              {channelOwner && (
                <>
                  <img
                    src={currentVideo.channel?.img}
                    alt="Channel"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-white">
                      {channelOwner.name}
                    </h2>
                    <span className="text-white">
                      {channelOwner.subscribers} subscribers
                    </span>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
              className={`px-4 py-2 rounded transition duration-300 ${
                isSubscribed
                  ? "bg-gray-600 text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        </div>
        <Comments videoId={videoId} />
      </div>

      <div className="hidden lg:block lg:w-[40%] p-4">
        <h2 className="text-white text-xl font-semibold mb-4">
          Recommendations
        </h2>
        <Recommendation tags={currentVideo.tags} />
      </div>
    </div>
  );
};

export default Video;
