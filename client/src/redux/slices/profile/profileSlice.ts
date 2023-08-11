import { createSlice } from '@reduxjs/toolkit';
import type { ProfileType } from '../../../types/profileType';
import { getProfileThunk, likeProfileThunk } from './profileThunk';

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

    builder.addCase(likeProfileThunk.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el.id!==action.payload.userId)
      state.data.push(action.payload.data)
      console.log(state.data);
      state.status = 'loaded'
    })
    builder.addCase(likeProfileThunk.pending, (state) => ({ data: state.data, status: 'loading' }));
    builder.addCase(likeProfileThunk.rejected, (state) => ({ data: state.data, status: 'unloaded' }));


  },
});

export default userSlice.reducer;
