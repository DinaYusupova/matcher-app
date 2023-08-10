import { createAsyncThunk } from '@reduxjs/toolkit';
import type{ SigninUserType, SignupUserType, UserModelType } from '../../../types/userType';
import { checkUserService, logoutUserService, signinUserService, signupUserService } from '../../../services/apiUserServ';

export const checkUserThunk = createAsyncThunk<UserModelType>('user/CheckUser', () => checkUserService());

export const signinUserThunk = createAsyncThunk<UserModelType, SigninUserType>(
  'user/SignInUser',
  (formData) => signinUserService(formData),
);
export const signupUserThunk = createAsyncThunk<UserModelType, SignupUserType>(
  'user/SignUpUser',
  (formData) => signupUserService(formData),
);
export const logoutUserThunk = createAsyncThunk('user/LogoutUser', () => logoutUserService());
