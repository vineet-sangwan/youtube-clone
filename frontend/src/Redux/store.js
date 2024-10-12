// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videoReducer,
    userInfo: userReducer,
  },
});

export default store;
