/* eslint-disable import/prefer-default-export */
import type { ProfileModelType } from '../types/profileType';
import { apiService } from './apiServiceConfig';

// type ApiServiceType<ReturnValue = ProfileModelType, ServiceArg = number> = (
//   arg: ServiceArg,
// ) => Promise<ReturnValue>;

type ApiServiceLikeType<
  ReturnValue = { data: ProfileModelType; userId: ProfileModelType['userId'] },
  ServiceArg = number,
> = (arg: ServiceArg) => Promise<ReturnValue>;

export const fetchProfileService = async (): Promise<ProfileModelType[]> => {
  const { data } = await apiService<ProfileModelType[]>('/profile');
  return data;
};

export const likeProfileService: ApiServiceLikeType = async (userId) => {
  const { data } = await apiService.post<ProfileModelType>('/profile/like', { userId });
  return { data, userId };
};

export const dislikeProfileService = async (): Promise<ProfileModelType> => {
  const { data } = await apiService<ProfileModelType>('/profile/dislike');
  return data;
};
