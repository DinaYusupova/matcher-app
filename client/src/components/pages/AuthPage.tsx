/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Box, Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import './styles/AuthPage.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';

import type { SigninUserType, SignupUserType } from '../../types/userType';
import {
  signinUserAuthThunk,
  signupUserAuthThunk,
} from '../../redux/slices/userAuth/userAuthThunk';
import { postLocationService } from '../../services/apiLocationService';

export default function AuthPage(): JSX.Element {
  const { authType } = useParams();
  const dispatch = useAppDispatch();
  if (authType !== 'signin' && authType !== 'signup') return <div>fool</div>;
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    authType === 'signup'
      ? void dispatch(signupUserAuthThunk(formData as SignupUserType))
      : void dispatch(signinUserAuthThunk(formData as SigninUserType));
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Box
        sx={{
          fontFamily: 'Monospace',
          fontStyle: 'italic',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        component="div"
      >
        WELCOME
      </Box>
      <Box onSubmit={submitHandler} className="form" sx={{ mt: '10px' }} component="form">
        <TextField
          name="email"
          className="inputs"
          required
          variant="filled"
          label="mail"
          type="email"
        />
        <TextField
          name="password"
          className="inputs"
          required
          variant="filled"
          label="choose a password"
          type="password"
        />
        <Button
          sx={{
            maxWidth: '30%',
            backgroundColor: 'purple',
            mt: 1,
            ':hover': { backgroundColor: 'orange' },
          }}
          className="button"
          variant="contained"
          type="submit"
        >
          {authType === 'signin' ? `войти` : `зарегиться`}
        </Button>
      </Box>
    </>
  );
}
