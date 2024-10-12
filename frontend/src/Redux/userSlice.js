import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for sign-in
export const signInUser = createAsyncThunk(
  'user/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for sign-out
export const signOutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to check user authentication status
export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/me', { withCredentials: true });
      return response.data; // Assuming the API returns user data if authenticated
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Handle the error message from the response
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sign-in user
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sign-out user
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Check Auth status
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload; // Set user info if authenticated
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.userInfo = null; // Clear user info if not authenticated
        state.error = action.payload;
      });
  },
});

export const { clearError, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
