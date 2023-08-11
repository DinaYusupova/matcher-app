import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllOwnMessagesService,
  findChatByPkService,
} from '../../../services/apiMessageService';
import type { ChatType } from '../../../types/ChatType';
import type { UserModelType } from '../../../types/userType';

export const fetchSelectedChatThunk = createAsyncThunk<ChatType, UserModelType['id']>(
  'chat/GetSelectedChat',
  (id) => findChatByPkService(id),
);
