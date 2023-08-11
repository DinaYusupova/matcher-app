import type { UserModelType } from './userType';

export type MessageType = {
  senderId: UserModelType['id'];
  recipientId: UserModelType['id'];
  message: string;
};
export type ChatType = MessageType[];
