import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userAuth/userAuthSlice';
import ChatReducer from './slices/messages/ChatSlice';
import profileReducer from './slices/profile/profileSlice';

export const store = configureStore({
  reducer: {
  
    profile: profileReducer,
    chat: ChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
