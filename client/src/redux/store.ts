import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userAuth/userAuthSlice';
import ChatReducer from './slices/messages/ChatSlice';
import profileReducer from './slices/profile/profileSlice';
import availableChatReducer from './slices/availableChats/availableChatsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    chat: ChatReducer,
    availableChat: availableChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
