import { createSlice } from '@reduxjs/toolkit';

import { checkUserThunk, logoutUserThunk, signinUserThunk, signupUserThunk } from './userThunk';
import type{ UserType } from '../../../types/userType';

const initialState = { status: 'loading' };
const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(checkUserThunk.pending, (state) => ({ status: 'loading' }));
    builder.addCase(checkUserThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(signupUserThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(signupUserThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(signinUserThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(signinUserThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(logoutUserThunk.fulfilled, (state) => ({ status: 'guest' }));
    builder.addCase(logoutUserThunk.rejected, (state) => state);
  },
});
export default userSlice.reducer;
