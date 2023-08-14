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
  console.log(data[0].name, data[0].distanceBetweenUsers, "ДИСТАНЦИЯ", data[0].userLatitude, "LATITUDE", data[0].userLongitude, "Longitude")
  return { data, userId };
};

export const dislikeProfileService: ApiServiceType = async (userId) => {
  const { data } = await apiService<ProfileModelType[]>(`/profile/dislike/${userId}`);
  console.log(data[0].name, data[0].distanceBetweenUsers, "ДИСТАНЦИЯ", data[0].userLatitude, "LATITUDE", data[0].userLongitude, "Longitude")
  return { data, userId };
};
