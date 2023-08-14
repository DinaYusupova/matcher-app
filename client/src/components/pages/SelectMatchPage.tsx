import React, { useEffect } from 'react';
import UserCard from '../UI/UserCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProfileThunk } from '../../redux/slices/profile/profileThunk';
import Loader from '../hocs/Loader';
import { postLocationService } from '../../services/apiLocationService';

export default function SelectMatchPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getProfileThunk());
  }, []);

  const profile = useAppSelector((store) => store.profile);

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        postLocationService(userLatitude, userLongitude)
          .then((el) => console.log(el))
          .catch(console.error);
      },
      (error) => {
        console.error('Ошибка получения геолокации:', error);
      },
    );
  } else {
    console.error('Геолокация недоступна в этом браузере.');
  }

  return (
    <Loader isLoading={profile.status === 'loading'}>
      <UserCard />
    </Loader>
  );
}
