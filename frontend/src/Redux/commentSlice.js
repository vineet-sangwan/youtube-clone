// features/commentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Async thunk for adding a comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ userId, videoId, desc }, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Get the token from cookies

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    const commentData = {
      userId,
      videoId,
      desc,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/comments', commentData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data; // Return the new comment data
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for deleting a comment
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Get the token from cookies

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    try {
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return commentId; // Return the comment ID for filtering
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for fetching comments
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comments/${videoId}`);
      return response.data; // Return the fetched comments
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Additional reducers can go here, if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // Add the new comment to the state
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment._id !== action.payload); // Remove the deleted comment
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload; // Update state with fetched comments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default commentsSlice.reducer;
