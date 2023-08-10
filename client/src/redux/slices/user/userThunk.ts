/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserInfoModelType } from '../../../types/userInfoType';
import { fetchUserInfoService } from '../../../services/apiUserService';

export const getUserThunk = createAsyncThunk<UserInfoModelType>('/user/getUser', (async) =>
  fetchUserInfoService(),
);
