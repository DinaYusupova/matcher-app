/* eslint-disable import/prefer-default-export */
import type { ProfileModelType } from '../types/profileType';
import { apiService } from './apiServiceConfig';

type ApiServiceType<
  ReturnValue = { data: ProfileModelType[]; userId: ProfileModelType['userId'] },
  ServiceArg = number,
> = (arg: ServiceArg) => Promise<ReturnValue>;

export const fetchProfileService = async (): Promise<ProfileModelType[]> => {
  const { data } = await apiService<ProfileModelType[]>('/profile');
  return data;
};

export const likeProfileService: ApiServiceType = async (userId) => {
  const { data } = await apiService.post<ProfileModelType[]>('/profile/like', { userId });
  return { data, userId };
};

export const dislikeProfileService: ApiServiceType = async (userId) => {
  const { data } = await apiService<ProfileModelType[]>(`/profile/dislike/${userId}`);
  return { data, userId };
};
