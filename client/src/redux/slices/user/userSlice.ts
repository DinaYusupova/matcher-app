import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserInfoType } from '../../../types/userInfoType';
import { getUserThunk } from './userThunk';

type UserInfoSliceType = UserInfoType | { status: 'loading' };

const initialState: UserInfoSliceType = { status: 'loading' };

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserInfoSliceType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.fulfilled, (state, action) => ({
      ...action.payload,
      status: 'loaded',
    }));
    builder.addCase(getUserThunk.pending, (state) => ({ status: 'loading' }));
    builder.addCase(getUserThunk.rejected, (state) => ({ status: 'unloaded' }));
  },
});

export default userSlice.reducer;
