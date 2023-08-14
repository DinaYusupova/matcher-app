/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import './styles/AuthPage.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';

import type { SigninUserType, SignupUserType } from '../../types/userType';
import { signinUserAuthThunk, signupUserAuthThunk } from '../../redux/slices/userAuth/userAuthThunk';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();
  if (auth !== 'signin' && auth !== 'signup') return <div>fool</div>;
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    auth === 'signup'
      ? void dispatch(signupUserAuthThunk(formData as SignupUserType))
      : void dispatch(signinUserAuthThunk(formData as SigninUserType));
  };
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
          {auth === 'signin' ? `войти` : `зарегиться`}
        </Button>
      </Box>
    </>
  );
}
