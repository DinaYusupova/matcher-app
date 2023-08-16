import { createSlice } from '@reduxjs/toolkit';
import type { FirstMessage } from '../../../types/firstMessage';
import { fetchAvailableMessages } from './availableChatThunks';

const initialState: FirstMessage[] = [];
const chatSlice = createSlice({
  name: 'availableChat',
  initialState,
  reducers: {
    // findCurrentTimerForChat: (state, action) => state.find((el) => el.id === action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableMessages.fulfilled, (state, { payload }) => payload);
    builder.addCase(fetchAvailableMessages.rejected, (state, { payload }) => state);
  },
});
export default chatSlice.reducer;
// export const { findCurrentTimerForChat } = chatSlice.actions;
