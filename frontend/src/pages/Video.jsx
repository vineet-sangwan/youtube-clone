import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import Recommendation from "../components/Recommendation";
import { likeVideo, dislikeVideo, subscribe } from "../Redux/userInfo.js";
import { getVideo } from "../Redux/videoSlice.js";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

const Video = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const { currentVideo, loading, error } = useSelector((state) => state.videos);
  console.log(currentVideo);
  const videoId = currentVideo ? currentVideo._id : null;
  console.log(videoId);

  const [comments, setComments] = useState([
    { id: 1, text: "Great video!" },
    { id: 2, text: "Very informative, thanks!" },
    { id: 3, text: "I learned a lot from this!" },
  ]);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(getVideo(id)); // Fetch the video by ID using Axios
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  const handleLike = () => {
    dispatch(likeVideo(videoId));
  };

  const handleDislike = () => {
    dispatch(dislikeVideo(videoId));
  };

  const handleSubscribe = () => {
    if (currentUser) {
      dispatch(subscribe(currentVideo.channel?._id));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure currentVideo is defined before accessing its properties
  if (!currentVideo) return <div>No video found.</div>;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 min-h-screen">
      {/* Left Side: Video Section */}
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

          {/* Video Title and Description */}
          <div className="p-4">
            <h2 className="text-white text-2xl font-semibold mb-2">
              {currentVideo.title}
            </h2>
            <p className="text-gray-300 mb-4">{currentVideo.desc}</p>
            <span className="text-gray-500">
              {currentVideo.views} • {format(currentVideo.createdAt)}
            </span>
          </div>

          {/* Additional Options (like, share buttons) */}
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

          {/* Channel Info */}
          <div className="flex items-center justify-between p-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <img
                src={currentVideo.channel?.img}
                alt="Channel"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-white">
                  {currentVideo.channel?.name}
                </h2>
                <span className="text-gray-500">
                  {currentVideo.channel?.subscribers} subscribers
                </span>
              </div>
            </div>
            <button
              onClick={handleSubscribe}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              {currentUser &&
              currentUser.subscribedChannels &&
              currentUser.subscribedChannels.includes(currentVideo.channel?._id)
                ? "Subscribed"
                : "Subscribe"}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="w-full bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-white text-xl mb-2">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-700 bg-gray-900 text-white"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Comment
            </button>
          </form>
          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id} className="text-gray-300">
                {comment.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Recommendations Section */}
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
