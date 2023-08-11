import { createSlice } from '@reduxjs/toolkit';
import type { ChatType } from '../../../types/ChatType';
import { fetchSelectedChatThunk } from './ChatThunk';

const initialState: ChatType = [];
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => [...state, action.payload],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSelectedChatThunk.fulfilled, (state, { payload }) => payload);
    builder.addCase(fetchSelectedChatThunk.rejected, (state, { payload }) => state);
  },
});
export default chatSlice.reducer;
export const { addMessage } = chatSlice.actions;
