import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import type { PathMatch } from 'react-router-dom';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, createTheme } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUserAuthThunk } from '../../redux/slices/userAuth/userAuthThunk';
import logo from '../../img/matcher.png';

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
  const authorizedRouteMatch = useRouteMatch(['/', '/chat']);
  const authorizedCurTab = authorizedRouteMatch?.pattern.path;
  const isActiveTab = (path: string) => location.pathname === path;

  return (
    <Box
      component="nav"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        color: 'white',
        paddingLeft: '120px',
        paddingRight: '50px',
      }}
    >
      <Box
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        component={Link}
        to="/"
      >
        <img src={logo} alt="logo" style={{ width: '50px' }} />
        <h1
          style={{
            color: 'black',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: '900',
            fontSize: '16px',
            lineHeight: '1.05',
            maxWidth: '50px',
          }}
        >
          MA TCH ER
        </h1>
      </Box>
      {user.status === 'guest' && (
        <Box sx={{ justifyContent: 'end', display: 'flex', alignItems: 'center' }}>
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
        </Box>
      )}

      {user.status === 'logged' && (
        <Box sx={{ justifyContent: 'end', display: 'flex', alignItems: 'center' }}>
          <Tabs value={authorizedCurTab}>
          <Tab
              label="Поиск"
              value="/match"
              to="/match"
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
            <Tab
              label="Профиль"
              value="/account"
              to="/account"
              component={Link}
              sx={{ textTransform: 'uppercase' }}
            />
          </Tabs>
          <Button
            color="error"
            onClick={() => {
              void dispatch(logoutUserAuthThunk());
              // location('/auth/signin');
            }}
          >
            Разлогиниться
          </Button>
        </Box>
      )}
    </Box>
  );
}
