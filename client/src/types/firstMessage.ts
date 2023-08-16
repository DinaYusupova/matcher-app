import type { AccountPhotoType } from './accountPhotoType';
import type { ProfileType } from './profileType';
import type { UserModelType } from './userType';

export type FirstMessage = {
  id: number;
  senderId: UserModelType['id'];
  recipientId: UserModelType['id'];
  message: null;
  createdAt: Date
  sender: UserModelType & {
    profile: ProfileType[];
    photo: AccountPhotoType[];
  };
  recipient: FirstMessage['sender'];
};
