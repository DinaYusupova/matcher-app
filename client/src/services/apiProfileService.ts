/* eslint-disable import/prefer-default-export */
import type { ProfileModelType } from '../types/profileType';
import type { UserLocationType } from '../types/userLocationType';
import { apiService } from './apiServiceConfig';

type ApiServiceType<
  ReturnValue = { data: ProfileModelType[]; userId: ProfileModelType['userId'] },
  ServiceArg = number,
> = (arg: ServiceArg) => Promise<ReturnValue>;

type ApiServiceGetType<ReturnValue = ProfileModelType[], ServiceArg = UserLocationType> = (
  arg: ServiceArg,
) => Promise<ReturnValue>;

export const fetchProfileService: ApiServiceGetType = async ({ userLatitude, userLongitude }) => {
  const { data } = await apiService.post<ProfileModelType[]>('/profile', { userLatitude, userLongitude });
  return data;
};

export const likeProfileService: ApiServiceType = async (userId) => {
  console.log(userId, 'userId LIKE SERVICE');
  const { data } = await apiService.post<ProfileModelType[]>('/like', { userId });
  console.log(data, 'data LIKE SERVICE');
  return { data, userId };
};

export const dislikeProfileService: ApiServiceType = async (userId) => {
  const { data } = await apiService<ProfileModelType[]>(`/dislike/${userId}`);
  return { data, userId };
};
