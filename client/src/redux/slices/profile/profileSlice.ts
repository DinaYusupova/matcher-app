import { createSlice } from '@reduxjs/toolkit';
import type { ProfileType } from '../../../types/profileType';
import { getProfileThunk } from './profileThunk';

type ProfileSliceType = { data: ProfileType[]; status: 'loading' | 'unloaded' | 'loaded' };

const initialState: ProfileSliceType = { data: [], status: 'loading' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileThunk.fulfilled, (state, action) => ({
      data: action.payload,
      status: 'loaded',
    }));
    builder.addCase(getProfileThunk.pending, (state) => ({ data: [], status: 'loading' }));
    builder.addCase(getProfileThunk.rejected, (state) => ({ data: [], status: 'unloaded' }));
  },
});

export default userSlice.reducer;
