import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, PathMatch, matchPath, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

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
  const routeMatch = useRouteMatch(['/signin', '/signup', '/']);
  const currentTab = routeMatch?.pattern?.path;
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '50px',
        backgroundColor: 'greenyellow',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <Tabs value={currentTab}>
        <Tab
          label="Войти"
          value="/signin"
          to="/signin"
          component={Link}
          sx={{ textTransform: 'uppercase' }}
        />
        <Tab
          label="Зарегистрироваться"
          value="/signup"
          to="/signup"
          component={Link}
          sx={{ textTransform: 'uppercase' }}
        />

        <Tab
          label="Главная"
          value="/"
          to="/"
          component={Link}
          sx={{ textTransform: 'uppercase' }}
        />
        <Button
          color="error"
          onClick={() => {
           void dispatch(logoutUserThunk());
          }}
        >
          Разлогиниться
        </Button>
      </Tabs>
    </Box>
  );
}
