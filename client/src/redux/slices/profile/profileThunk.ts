/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProfileModelType } from '../../../types/profileType';
import {
  dislikeProfileService,
  fetchProfileService,
  likeProfileService,
} from '../../../services/apiProfileService';

export const getProfileThunk = createAsyncThunk<ProfileModelType[]>('/user/getUser', (async) =>
  fetchProfileService(),
);

export const likeProfileThunk = createAsyncThunk<
  { data: ProfileModelType[]; userId: number },
  ProfileModelType['userId']
>('/user/like', async (userId) => likeProfileService(userId));

export const dislikeProfileThunk = createAsyncThunk<
  { data: ProfileModelType[]; userId: number },
  ProfileModelType['userId']
>('/user/dislike', async (userId) => dislikeProfileService(userId));
