import type { AccountPhotoType } from './accountPhotoType';
import type { ProfileType } from './profileType';
import type { UserModelType } from './userType';

export type FirstMessage = {
  id: number;
  senderId: UserModelType['id'];
  recipientId: UserModelType['id'];
  message: null;
  sender: UserModelType & {
    profile: ProfileType[];
    photo: AccountPhotoType[];
  };
};
