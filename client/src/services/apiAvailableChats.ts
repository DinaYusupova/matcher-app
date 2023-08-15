import type { FirstMessage } from '../types/firstMessage';
import { apiService } from './apiServiceConfig';

export const fetchAvailableMessagesService = async (): Promise<FirstMessage[]> => {
  const { data } = await apiService.post<FirstMessage[]>('/chat/find/matched');
  return data;
};
export const test = (): void => {};
