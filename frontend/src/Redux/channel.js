import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

// Async thunk to add a new channel
export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (channelData, { rejectWithValue, getState }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) return rejectWithValue('Token is not available');

    // Get userId from the Redux state
    const { userInfo } = getState().user;

    // Create a new channel object with userId
    const channelWithUserId = {
      ...channelData,
      userId: userInfo._id, // Add userId from userInfo
    };

    try {
      const response = await axios.post('http://localhost:3000/api/channels/', channelWithUserId, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      if (err.response.data === "You can only create one channel.") {
        alert("You have already created a channel.");
      }
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to update a channel
export const updateChannel = createAsyncThunk(
  'channels/updateChannel',
  async ({ id, channelData }, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) return rejectWithValue('Token is not available');

    try {
      const response = await axios.put(`http://localhost:3000/api/channels/${id}`, channelData, {
        headers: { Authorization: `Bearer ${token}` }, // Set the authorization header
        withCredentials: true, // Ensure cookies are sent with the request
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to delete a channel
export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (id, { rejectWithValue, getState }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) return rejectWithValue('Token is not available');

    // Get userId from the Redux state
    const { userInfo } = getState().user;

    try {
      await axios.delete(`http://localhost:3000/api/channels/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Set the authorization header
        withCredentials: true, // Ensure cookies are sent with the request
      });
      return id; // Return the channel id that was deleted
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to fetch all channels
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/channels');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for fetching a channel by ID
export const fetchChannelById = createAsyncThunk(
  "channels/fetchChannelById",
  async (channelId, { rejectWithValue }) => {
    console.log("Fetching channel with ID:", channelId); // Log channel ID
    try {
      const response = await axios.get(`http://localhost:3000/api/channels/find/${channelId}`);
      console.log("Channel data received:", response.data); // Log response data
      return response.data;
    } catch (err) {
      if (!err.response) {
        console.error("Network error:", err); // Log network errors
        throw err;
      }
      console.error("Error fetching channel:", err.response.data); // Log errors from server
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to subscribe to a channel
export const subscribeToChannel = createAsyncThunk(
  'subscription/subscribeToChannel',
  async (channelId, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) return rejectWithValue('Token is not available');

    try {
      const response = await axios.post(
        `http://localhost:3000/api/channels/${channelId}/subscribe`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data; // Return the response data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to unsubscribe from a channel
export const unsubscribeFromChannel = createAsyncThunk(
  'subscription/unsubscribeFromChannel',
  async (channelId, { rejectWithValue }) => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (!token) return rejectWithValue('Token is not available');

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/channels/${channelId}/unsubscribe`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data; // Return the response data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Initial state
const initialState = {
  channels: [],
  currentChannel: {  }, // Initialize isSubscribed
  isSubscribed: false,
  isLoading: false,
  error: null,
};

// Channel slice
const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch channels
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Add channel
    builder
      .addCase(addChannel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels.push(action.payload); // Add the new channel to the list
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update channel
    builder
      .addCase(updateChannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.channels.findIndex((channel) => channel.id === action.payload.id);
        if (index !== -1) {
          state.channels[index] = action.payload; // Update the channel details
        }
      })
      .addCase(updateChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete channel
    builder
      .addCase(deleteChannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.channels = state.channels.filter((channel) => channel.id !== action.payload);
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch channel by ID
    builder
      .addCase(fetchChannelById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChannelById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentChannel = action.payload; // Updated to match the initial state property
      })
      .addCase(fetchChannelById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "An error occurred";
      });

    // Subscribe to channel
    builder
      .addCase(subscribeToChannel.fulfilled, (state, action) => {
        state.currentChannel.isSubscribed = true; // Set isSubscribed to true
        // Optionally update the channel in the channels array
        const channelIndex = state.channels.findIndex(channel => channel.id === action.payload.id);
        if (channelIndex !== -1) {
          state.channels[channelIndex] = { ...state.channels[channelIndex], ...action.payload };
        }
      });

    // Unsubscribe from channel
    builder
      .addCase(unsubscribeFromChannel.fulfilled, (state, action) => {
        state.currentChannel.isSubscribed = false; // Set isSubscribed to false
        // Optionally update the channel in the channels array
        const channelIndex = state.channels.findIndex(channel => channel.id === action.payload.id);
          if (channelIndex !== -1) {
            state.channels[channelIndex] = { ...state.channels[channelIndex], ...action.payload };
          }
        });
    },
  });
  
  // Export actions and reducer
  export const { reset } = channelSlice.actions;
  export default channelSlice.reducer;
  