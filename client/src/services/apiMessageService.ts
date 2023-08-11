import type { ChatType } from '../types/ChatType';
import type { UserModelType } from '../types/userType';
import { apiService } from './apiServiceConfig';

export const findChatByPkService = async (userid: UserModelType['id']): Promise<ChatType> => {
  const { data } = await apiService.post<ChatType>(`/chat/${userid}`);
  return data;
};
