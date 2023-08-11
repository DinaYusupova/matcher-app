import type React from 'react';


import type { SigninUserType, SignupUserType, UserModelType } from '../types/userType';
import { apiService } from './apiServiceConfig';

export const signinUserService = async (formData: SigninUserType): Promise<UserModelType> => {
  const { data } = await apiService.post<UserModelType>('/auth/signin', formData);
  return data;
};
export const signupUserService = async (formData: SignupUserType): Promise<UserModelType> => {
  const { data } = await apiService.post<UserModelType>('/auth/signup', formData);
  return data;
};
export const logoutUserService = async (): Promise<void> => {
  await apiService('/auth/logout');
};
export const checkUserService = async (): Promise<UserModelType> => {
  const { data } = await apiService.post<UserModelType>('/auth/check');
  return data;
};
