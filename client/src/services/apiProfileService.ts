/* eslint-disable import/prefer-default-export */
import type { ProfileModelType } from '../types/profileType';
import type { UserLocationType } from '../types/userLocationType';
import { apiService } from './apiServiceConfig';

type ApiServiceType<
  ReturnValue = { data: ProfileModelType[]; userId: ProfileModelType['userId'] },
  ServiceArg = number,
> = (arg: ServiceArg) => Promise<ReturnValue>;

type ApiGetServiceType<ReturnValue = ProfileModelType[], ServiceArg = UserLocationType> = (
  arg: ServiceArg,
) => Promise<ReturnValue>;


export const fetchProfileService: ApiGetServiceType = async ({ userLatitude, userLongitude }) => {
  const { data } = await apiService.post<ProfileModelType[]>('/profile', {
    userLatitude,
    userLongitude,
  });
  return data;
};

export const likeProfileService: ApiServiceType = async (userId) => {
  const { data } = await apiService.post<ProfileModelType[]>('/like', { userId });
  return { data, userId };
};


export const dislikeProfileService: ApiServiceType = async (userId) => {
  const { data } = await apiService<ProfileModelType[]>(`/dislike/${userId}`);
  return { data, userId };
};
