/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ApiDataUserIdReturn, ProfileModelType, ReturnPostLikeType } from '../../../types/profileType';
import {
  dislikeProfileService,
  fetchProfileService,
  likeProfileService,
} from '../../../services/apiProfileService';
import type { UserLocationType } from '../../../types/userLocationType';

export const getProfileThunk = createAsyncThunk<ProfileModelType[], UserLocationType>(
  '/user/getUser',
  async ({ userLatitude, userLongitude }) => fetchProfileService({ userLatitude, userLongitude }),
);
export const likeProfileThunk = createAsyncThunk< ApiDataUserIdReturn, ProfileModelType['userId']>(
  '/user/like',
  async (userId) => likeProfileService(userId),
);

export const dislikeProfileThunk = createAsyncThunk<
  { data: ProfileModelType[]; userId: number },
  ProfileModelType['userId']
>('/user/dislike', async (userId) => dislikeProfileService(userId));
