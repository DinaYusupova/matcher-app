import React, { useEffect } from 'react';
import UserCard from '../UI/UserCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProfileThunk } from '../../redux/slices/profile/profileThunk';
import Loader from '../hocs/Loader';

export default function SelectMatchPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getProfileThunk());
  }, []);

  const profile = useAppSelector((store) => store.profile);

  return (
    <Loader isLoading={profile.status === 'loading'}>
      <UserCard />
    </Loader> 
  );
}
