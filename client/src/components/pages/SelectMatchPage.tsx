import React, { useEffect } from 'react';
import UserCard from '../UI/UserCard';
import { useAppDispatch } from '../../redux/hooks';
import { getUserThunk } from '../../redux/slices/user/userThunk';

export default function SelectMatchPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUserThunk());
  }, []);
  
  return <UserCard />;
}
