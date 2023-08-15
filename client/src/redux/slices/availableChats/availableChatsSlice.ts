import { createSlice } from '@reduxjs/toolkit';
import type { FirstMessage } from '../../../types/firstMessage';
import { fetchAvailableMessages } from './availableChatThunks';

const initialState: FirstMessage[] = [];
const chatSlice = createSlice({
  name: 'availableChat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableMessages.fulfilled, (state, { payload }) => payload);
    builder.addCase(fetchAvailableMessages.rejected, (state, { payload }) => state);
  },
});
export default chatSlice.reducer;