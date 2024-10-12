import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for asynchronous actions

// Add a new video
export const addVideo = createAsyncThunk('videos/addVideo', async (videoData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/video', videoData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

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
    const response = await axios.delete(`http://localhost:3000/api/video/${id}`);
    return id; // Return the video id that was deleted
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Get a single video
export const getVideo = createAsyncThunk('videos/getVideo', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/video/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Fetch random videos
export const fetchRandomVideos = createAsyncThunk('videos/fetchRandomVideos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3000/api/video/random');
     console.log(response)
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

// Fetch videos from subscribed channels
export const fetchSubscribedVideos = createAsyncThunk(
  'videos/fetchSubscribedVideos',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token'); // Get the token from cookies

      const response = await axios.get('http://localhost:3000/api/video/sub', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      
      return response.data; // Return the subscribed videos data
    } catch (err) {
      return rejectWithValue(err.response.data); // Return the error message
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
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Initial state
const initialState = {
  videos: [],
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
    // Add video
    builder
      .addCase(addVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos.push(action.payload);
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

    // Get video
    builder
      .addCase(getVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(getVideo.rejected, (state, action) => {
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
      })
      .addCase(fetchSubscribedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchSubscribedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
        state.videos = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default videoSlice.reducer;
