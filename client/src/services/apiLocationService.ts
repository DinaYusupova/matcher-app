/* eslint-disable import/prefer-default-export */
import { apiService } from './apiServiceConfig';

type ApiServiceType<ReturnValue = LocationReturn, ServiceArg = number> = (
  arg1: ServiceArg,
  arg2: ServiceArg,
) => Promise<ReturnValue>;

type LocationReturn = {
  message: string;
};

type LocationType = {
  userLatitude: number;
  userLongitude: number;
};

export const postLocationService: ApiServiceType = async (userLatitude, userLongitude) => {
  const { message } = await apiService.post<LocationType, LocationReturn>('/save-location', {
    userLatitude,
    userLongitude,
  });
  return { message };
};
