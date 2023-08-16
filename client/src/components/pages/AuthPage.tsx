/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Box, Button, TextField, Container } from '@mui/material';
import React from 'react';
import './styles/AuthPage.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';

import type { SigninUserType, SignupUserType } from '../../types/userType';
import {
  signinUserAuthThunk,
  signupUserAuthThunk,
} from '../../redux/slices/userAuth/userAuthThunk';

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

  return (
    <div style={{ height: '100vh', marginTop:"4px", paddingTop: "100px", background: "#f4f6f5"}}>
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
          label="email"
          type="email"
        />
        <TextField
          name="password"
          className="inputs"
          required
          variant="filled"
          label= "password"
          type="password"
        />
        <Button
          sx={{
            maxWidth: '30%',
            backgroundColor: 'black',
            mt: 1,
            ':hover': { backgroundColor: 'gray' },
          }}
          className="button"
          variant="contained"
          type="submit"
        >
          {authType === 'signin' ? `войти` : `зарегистрироваться`}
        </Button>
      </Box>
    </div>
  );
}
