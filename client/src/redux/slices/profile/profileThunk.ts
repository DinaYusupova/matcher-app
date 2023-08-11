/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProfileModelType } from '../../../types/profileType';
import { fetchProfileService } from '../../../services/apiProfileService';

export const getProfileThunk = createAsyncThunk<ProfileModelType[]>('/user/getUser', (async) =>
fetchProfileService(),
);
