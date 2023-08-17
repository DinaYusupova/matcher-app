import React from 'react';
import { Box, Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { signinUserAuthThunk, signupUserAuthThunk } from '../../redux/slices/userAuth/userAuthThunk';
import type { SigninUserType, SignupUserType } from '../../types/userType';
import './styles/AuthPage.css';

export default function AuthPage(): JSX.Element {
  const { authType } = useParams();
  const dispatch = useAppDispatch();

  if (authType !== 'signin' && authType !== 'signup') {
    return <div>Invalid authentication type</div>;
  }

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    if (authType === 'signup') {
      dispatch(signupUserAuthThunk(formData as SignupUserType));
    } else {
      dispatch(signinUserAuthThunk(formData as SigninUserType));
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FE3C72',
      },
      text: {
        primary: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100vh',
          marginTop: '30px', // Поднять контент чуть выше
        }}
      >
        <Box
          sx={{
          
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
                  fontSize: '50px', // Размер шрифта
                  fontWeight: 550, // Насыщенность шрифта
          }}
          component="div"
        >
          WELCOME!
        </Box>
        <Box
          onSubmit={submitHandler}
          className="form"
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            
          }}
          component="form"
        >
          <TextField
            name="email"
            required
            variant="filled"
            label="Email"
            type="email"
            fullWidth
            sx={{ marginTop: '30px', marginBottom: '40px' }}
          />
          <TextField
            name="password"
            required
            variant="filled"
            label="Choose a password"
            type="password"
            fullWidth
            sx={{ marginBottom: '40px' }}
          />
          <Button
            sx={{
              backgroundColor: '#FE3C72',
              '&:hover': { backgroundColor: '#E8355F' },
              fontFamily: 'Poppins, sans-serif', // Замените на имя вашего шрифта
              fontSize: '20px', // Размер шрифта
              fontWeight: 550, // Насыщенность шрифта
              minWidth:'300px'
            }}
            className="button"
            variant="contained"
            type="submit"
           
          >
            {authType === 'signin' ? 'Войти' : 'Зарегиcтрироваться'}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

