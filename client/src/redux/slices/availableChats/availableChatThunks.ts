import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableMessagesService } from '../../../services/apiAvailableChats';
import type { FirstMessage } from '../../../types/firstMessage';

export const fetchAvailableMessages = createAsyncThunk<FirstMessage[]>(
  'availableChat/GetAvailableChats',
  () => fetchAvailableMessagesService(),
);
export const example = () => {};
