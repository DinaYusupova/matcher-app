import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userAuth/userAuthSlice';
import ChatReducer from './slices/messages/ChatSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // posts: postsReducer,
    user: userReducer,
    chat: ChatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
