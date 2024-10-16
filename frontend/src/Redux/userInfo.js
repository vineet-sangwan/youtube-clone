import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Async thunk for getting user information
export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId, { rejectWithValue }) => {
    console.log('Fetching user with ID:', userId);

    try {
      const response = await axios.get(`http://localhost:3000/api/users/find/${userId}`, {
        withCredentials: true,
      });
      return response.data; // Return the user data
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for liking a video
export const likeVideo = createAsyncThunk(
  'video/likeVideo',
  async (videoId, { rejectWithValue }) => {
    console.log('Liking video with ID:', videoId);
    const token = Cookies.get('token');

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/users/like/${videoId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data; // Return the updated video data
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for disliking a video
export const dislikeVideo = createAsyncThunk(
  'video/dislikeVideo',
  async (videoId, { rejectWithValue }) => {
    console.log('Disliking video with ID:', videoId);
    const token = Cookies.get('token');

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/users/dislike/${videoId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data; // Return the updated video data
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for subscribing to a video
export const subscribeToVideo = createAsyncThunk(
  'video/subscribeToVideo',
  async (userId, { rejectWithValue }) => {
    console.log('Subscribing to user with ID:', userId);
    const token = Cookies.get('token');

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/users/sub/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data; // Return the updated subscription data
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk for unsubscribing from a video
export const unsubscribeFromVideo = createAsyncThunk(
  'video/unsubscribeFromVideo',
  async (videoId, { rejectWithValue }) => {
    console.log('Unsubscribing from video with ID:', videoId);
    const token = Cookies.get('token');

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/users/unsub/${videoId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data; // Return the updated subscription data
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Async thunk to check if the user is subscribed to a video/channel
export const checkSubscription = createAsyncThunk(
  'video/checkSubscription',
  async (videoId, { rejectWithValue }) => {
    console.log('Checking subscription for video with ID:', videoId);
    const token = Cookies.get('token');

    if (!token) {
      console.error('Token is not available.');
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/users/isSubscribed/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data; // Return the subscription status (true/false)
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong';
      return rejectWithValue(errorMsg);
    }
  }
);

// Video Info Slice
const videoInfoSlice = createSlice({
  name: 'videoInfo',
  initialState: {
    likes: [],
    dislikes: [],
    subscribedVideos: [], // New state for subscribed videos
    isSubscribed: false,
    user: {}, // New state for user info
    error: null,
    loading: false,
  },
  reducers: {
    setSubscriptionStatus: (state, action) => {
      state.isSubscribed = action.payload; // Set subscription status based on action payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle checking subscription
      .addCase(checkSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSubscription.fulfilled, (state, action) => {
        state.isSubscribed = action.payload; // Set the subscription status
        state.loading = false;
      })
      .addCase(checkSubscription.rejected, (state, action) => {
        state.error = action.payload; // Set the error if the check fails
        state.loading = false;
      })

      // Handle getting user information
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assign the retrieved user data
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle like video
      .addCase(likeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload.likes || []; // Safely assign likes
        state.dislikes = action.payload.dislikes || []; // Safely assign dislikes
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle dislike video
      .addCase(dislikeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dislikeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload.likes || []; // Safely assign likes
        state.dislikes = action.payload.dislikes || []; // Safely assign dislikes
      })
      .addCase(dislikeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle subscribe to video
      .addCase(subscribeToVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToVideo.fulfilled, (state, action) => {
        state.loading = false;
        // Update the subscribed videos list
        state.subscribedVideos.push(action.payload); // Assuming action.payload is the subscribed video
      })
      .addCase(subscribeToVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle unsubscribe from video
      .addCase(unsubscribeFromVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribeFromVideo.fulfilled, (state, action) => {
        state.loading = false;
        // Update the subscribed videos list by removing the unsubscribed video
        state.subscribedVideos = state.subscribedVideos.filter(video => video.id !== action.payload.id); // Ensure action.payload contains the unsubscribed video
      })
      .addCase(unsubscribeFromVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions if needed
export const { setSubscriptionStatus } = videoInfoSlice.actions;

// Export reducer
export default videoInfoSlice.reducer;
