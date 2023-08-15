import { createSlice } from '@reduxjs/toolkit';
import type { ProfileType } from '../../../types/profileType';
import { dislikeProfileThunk, getProfileThunk, likeProfileThunk } from './profileThunk';

type ProfileSliceType = {
  data: ProfileType[];
  status: 'loading' | 'unloaded' | 'loaded' | 'empty';
};

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

    builder.addCase(likeProfileThunk.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el.userId !== action.payload.userId);
      if (action.payload.data.length) {
        state.data.push(action.payload.data[0]);
        state.status = 'loaded';
      } else {
        state.status = 'empty';
      }
    });
    builder.addCase(likeProfileThunk.pending, (state) => ({ data: state.data, status: 'loaded' }));
    builder.addCase(likeProfileThunk.rejected, (state) => ({
      data: state.data,
      status: 'unloaded',
    }));

    builder.addCase(dislikeProfileThunk.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el.userId !== action.payload.userId);
      if (action.payload.data.length) {
        state.data.push(action.payload.data[0]);
        state.status = 'loaded';
      } else {
        state.status = 'empty';
      }
      state.status = 'loaded';
    });
    builder.addCase(dislikeProfileThunk.pending, (state) => ({ data: state.data, status: 'loaded' }));
    builder.addCase(dislikeProfileThunk.rejected, (state) => ({
      data: state.data,
      status: 'unloaded',
    }));
  },
});

export default userSlice.reducer;
