import { createAsyncThunk } from '@reduxjs/toolkit';
import type { SigninUserType, SignupUserType, UserModelType } from '../../../types/userType';
import {
  checkUserService,
  logoutUserService,
  signinUserService,
  signupUserService,
} from '../../../services/apiUserServ';

export const checkUserAuthThunk = createAsyncThunk<UserModelType>('user/CheckUser', async () =>
  await checkUserService(),
);

export const signinUserAuthThunk = createAsyncThunk<UserModelType, SigninUserType>(
  'user/SignInUser',
  (formData) => signinUserService(formData),
);
export const signupUserAuthThunk = createAsyncThunk<UserModelType, SignupUserType>(
  'user/SignUpUser',
  (formData) => signupUserService(formData),
);
export const logoutUserAuthThunk = createAsyncThunk('user/LogoutUser', () => logoutUserService());
