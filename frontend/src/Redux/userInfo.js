import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Function to get authentication headers
const getAuthHeaders = () => {
  const token = Cookies.get('token'); // Assuming your token is stored in a cookie named 'token'
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Async thunks for user operations
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, data, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      await axios.delete(`http://localhost:3000/api/users/${id}`, { headers });
      return id; // return id for deletion
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const subscribe = createAsyncThunk(
  'user/subscribe',
  async (userId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`http://localhost:3000/api/users/sub/${userId}`, {}, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unsubscribe = createAsyncThunk(
  'user/unsubscribe',
  async (userId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`http://localhost:3000/api/users/unsubscribe/${userId}`, {}, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeVideo = createAsyncThunk(
  'user/likeVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`http://localhost:3000/api/users/like/${videoId}`, {}, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dislikeVideo = createAsyncThunk(
  'user/dislikeVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(`http://localhost:3000/api/users/dislike/${videoId}`, {}, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch user data without authentication
export const getUser = createAsyncThunk(
  'user/getUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`, {
        withCredentials: true, // Include cookies with the request
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const userInfoSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Update user info
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null; // Clear user info after deletion
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle subscribe
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.loading = false;
        // Update state if needed (e.g., update subscribers count)
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle unsubscribe
      .addCase(unsubscribe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribe.fulfilled, (state) => {
        state.loading = false;
        // Update state if needed (e.g., update subscribers count)
      })
      .addCase(unsubscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle like video
      .addCase(likeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeVideo.fulfilled, (state) => {
        state.loading = false;
        // Update state if needed (e.g., update likes count)
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
      .addCase(dislikeVideo.fulfilled, (state) => {
        state.loading = false;
        // Update state if needed (e.g., update dislikes count)
      })
      .addCase(dislikeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle get user
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Set user info from response
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions if needed
export const {} = userInfoSlice.actions;

// Export reducer
export default userInfoSlice.reducer;
