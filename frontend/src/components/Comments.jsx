// components/Comments.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../Redux/commentSlice"; // Import the necessary actions

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments); // Get comments from Redux state
  const [newComment, setNewComment] = useState("");
  const { currentVideo } = useSelector((state) => state.videos);
  const userId = currentVideo ? currentVideo.userId : null;

  // Fetch comments when the component mounts or when videoId changes
  useEffect(() => {
    dispatch(fetchComments(videoId));
  }, [dispatch, videoId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentData = {
        userId: userId, // Include userId from your state
        videoId: videoId, // Include videoId passed as prop
        desc: newComment.trim(), // Use desc as per your API
      };
      dispatch(addComment(commentData)); // Dispatch addComment action with all required data
      setNewComment(""); // Clear input field
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId)); // Dispatch deleteComment action
  };

  if (loading) return <div>Loading comments...</div>;

  // Update error handling
  if (error) return <div>Error: {error || "Something went wrong"}</div>;

  return (
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
          <div key={comment._id} className="flex justify-between text-gray-300">
            <span>{comment.desc}</span>
            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
