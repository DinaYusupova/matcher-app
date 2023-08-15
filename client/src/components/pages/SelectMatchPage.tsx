import React, { useEffect } from 'react';
import UserCard from '../UI/UserCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProfileThunk } from '../../redux/slices/profile/profileThunk';
import Loader from '../hocs/Loader';
import { postLocationService } from '../../services/apiLocationService';

export default function SelectMatchPage(): JSX.Element {
  const dispatch = useAppDispatch();

  // useEffect(() => {}, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;

          void dispatch(getProfileThunk({userLatitude, userLongitude}));
        },
        (error) => {
          console.error('Ошибка получения геолокации:', error);
        },
      );
    } else {
      console.error('Геолокация недоступна в этом браузере.');
    }
  }, []);

  const profile = useAppSelector((store) => store.profile);

  return (
    <Loader isLoading={profile.status === 'loading'}>
      <UserCard />
    </Loader>
  );
}
