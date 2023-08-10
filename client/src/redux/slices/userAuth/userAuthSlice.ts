import { createSlice } from '@reduxjs/toolkit';

import type { UserType } from '../../../types/userType';
import {
  checkUserAuthThunk,
  logoutUserAuthThunk,
  signinUserAuthThunk,
  signupUserAuthThunk,
} from './userAuthThunk';

const initialState = { status: 'loading' };
const userAuthSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserAuthThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(checkUserAuthThunk.pending, (state) => ({ status: 'loading' }));
    builder.addCase(checkUserAuthThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(signupUserAuthThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(signupUserAuthThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(signinUserAuthThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(signinUserAuthThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(logoutUserAuthThunk.fulfilled, (state) => ({ status: 'guest' }));
    builder.addCase(logoutUserAuthThunk.rejected, (state) => state);
  },
});
export default userAuthSlice.reducer;
