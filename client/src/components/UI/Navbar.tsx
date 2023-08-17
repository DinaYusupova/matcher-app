import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import type { PathMatch } from 'react-router-dom';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUserAuthThunk } from '../../redux/slices/userAuth/userAuthThunk';

function useRouteMatch(patterns: readonly string[]): PathMatch | null {
  const location = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, location.pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function Navigation(): JSX.Element {
  const location = useLocation();
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const authRouteMatch = useRouteMatch(['/auth/signin', '/auth/signup']);
  const authCurTab = authRouteMatch?.pattern?.path;
  const authorizedRouteMatch = useRouteMatch(['/', '/chat', '/account']);
  const authorizedCurTab = authorizedRouteMatch?.pattern.path;
  const isActiveTab = (path: string) => location.pathname === path;

  const theme6 = createTheme({
    palette: {
      primary: {
        main: '#FE3C72', // Цвет контура и лейбла в активном состоянии
      },
      text: {
        primary: '#000', // Цвет текста
      },
    },
  });

  return (
    <ThemeProvider theme={theme6}>
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        color: "white",
      }}
    >
      {user.status === 'guest' && (
        <Tabs value={authCurTab}>
          <Tab
            label="Войти"
            value="/auth/signin"
            to="/auth/signin"
            component={Link}
            sx={{ textTransform: 'uppercase' }}
          />
          <Tab
            label="Зарегистрироваться"
            value="/auth/signup"
            to="/auth/signup"
            component={Link}
            sx={{ textTransform: 'uppercase' }}
          />
        </Tabs>
      )}

      {user.status === 'logged' && (
        <>
          <Tabs value={authorizedCurTab}>
          <Tab
              label="Главная"
              value="/"
              to="/"
              component={Link}
              sx={{ textTransform: 'uppercase' }}
            />
            <Tab
              label="Профиль"
              value="/account"
              to="/account"
              component={Link}
              sx={{ textTransform: 'uppercase' }}
            />
            <Tab
              label="Чат"
              value="/chat"
              to="/chat"
              component={Link}
              sx={{ textTransform: 'uppercase' }}
            />
          </Tabs>
          <Button
  style={{ color: '#5d615e' }}
  onClick={() => {
    void dispatch(logoutUserAuthThunk());
    // location('/auth/signin');
  }}
>
  Разлогиниться
</Button>
        </>
      )}
    </Box>
    </ThemeProvider>
  );
}
