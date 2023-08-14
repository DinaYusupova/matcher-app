import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import accountUserReducer from './slices/account/accountUserSlice'


export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // posts: postsReducer,
    
   
    user: userReducer,
   
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
