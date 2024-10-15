import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import videoInfoReducer from './userInfo';
import commentReducer from './commentSlice';
import channelReducer from './channel';

const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videoReducer,
    videoInfo: videoInfoReducer,
    comments: commentReducer,
    channels: channelReducer,
  },
});

export default store;
