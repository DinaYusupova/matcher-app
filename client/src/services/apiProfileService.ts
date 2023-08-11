/* eslint-disable import/prefer-default-export */
import type { ProfileModelType } from '../types/profileType';
import { apiService } from './apiServiceConfig';

export const fetchProfileService = async (): Promise<ProfileModelType[]> => {
  const { data } = await apiService<ProfileModelType[]>('/profile');
  return data;
};
