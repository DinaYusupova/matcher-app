/* eslint-disable import/prefer-default-export */
import type { UserInfoModelType } from '../types/userInfoType';
import { apiService } from './apiServiceConfig';

export const fetchUserInfoService = async (): Promise<UserInfoModelType> => {
  const { data } = await apiService<UserInfoModelType>('/userinfo');
  return data;
};


