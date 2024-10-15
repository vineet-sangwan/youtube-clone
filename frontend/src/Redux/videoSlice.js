// videoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

// Thunks for asynchronous actions

// Async thunk to add a new video with authentication
export const addVideo = createAsyncThunk(
  'videos/addVideo',
  async (videoData, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) return rejectWithValue('Token is not available');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/video',
        videoData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Ensure cookies are sent
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update an existing video
export const updateVideo = createAsyncThunk('videos/updateVideo', async ({ id, videoData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/video/${id}`, videoData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Delete a video
export const deleteVideo = createAsyncThunk('videos/deleteVideo', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3000/api/video/${id}`);
    return id; // Return the video id that was deleted
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Get a single video
export const getVideo = createAsyncThunk("videos/getVideo", async (id) => {
  const response = await axios.get(`http://localhost:3000/api/video/find/${id}`); // Adjust the endpoint as needed
  return response.data; // Ensure this matches the structure you expect
});

// Fetch random videos
export const fetchRandomVideos = createAsyncThunk('videos/fetchRandomVideos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3000/api/video/random');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Fetch trending videos
export const fetchTrendingVideos = createAsyncThunk('videos/fetchTrendingVideos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3000/api/video/trend');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Async thunk for fetching videos from subscribed channels
export const fetchSubscribedVideos = createAsyncThunk(
  'videos/fetchSubscribedVideos',
  async (_, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) {
      return rejectWithValue('Token is not available');
    }

    try {
      const response = await axios.get('http://localhost:3000/api/video/sub', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Ensure cookies are sent with requests
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch videos by tag
export const fetchVideosByTag = createAsyncThunk('videos/fetchVideosByTag', async (tags, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/video/tags?tags=${tags}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Search videos by title
export const searchVideos = createAsyncThunk('videos/searchVideos', async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/video/search?q=${query}`);
    return response.data; // Ensure this matches the structure you expect
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Initial state
const initialState = {
  videos: [],
  currentVideo: null,
  subscribedVideos: [],
  searchResults: [], // Store search results here
  isLoading: false,
  error: null,
};

// Video slice
const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    // You can add synchronous reducers if needed
  },
  extraReducers: (builder) => {
    // Get video 
    builder
      .addCase(getVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVideo = action.payload; // Ensure this matches the API response
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Add Video
    builder
    .addCase(addVideo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(addVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.videos.push(action.payload); // Add the new video to the list
    })
    .addCase(addVideo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });


    // Update video
    builder
      .addCase(updateVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.videos.findIndex((video) => video.id === action.payload.id);
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete video
    builder
      .addCase(deleteVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = state.videos.filter((video) => video.id !== action.payload);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch random videos
    builder
      .addCase(fetchRandomVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRandomVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchRandomVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch trending videos
    builder
      .addCase(fetchTrendingVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrendingVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchTrendingVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch subscribed videos
    builder
      .addCase(fetchSubscribedVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscribedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscribedVideos = action.payload;
      })
      .addCase(fetchSubscribedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Handle the error message from the rejected value
      });

    // Fetch videos by tag
    builder
      .addCase(fetchVideosByTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideosByTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideosByTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Search videos
    builder
      .addCase(searchVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload; // Store search results here
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Handle the error message from the rejected value
      });
  },
});

// Export the reducer
export default videoSlice.reducer;
