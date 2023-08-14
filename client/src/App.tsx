import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import SelectMatchPage from './components/pages/SelectMatchPage';
import AuthPage from './components/pages/AuthPage';
import ChatPage from './components/pages/ChatPage';
import Navigation from './components/UI/Navbar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserAuthThunk } from './redux/slices/userAuth/userAuthThunk';
import PrivateRouter from './components/hocs/PrivateRouter';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(checkUserAuthThunk());
  }, []);
  return (
    <>
      <Navigation />
      <Container sx={{ marginTop: '60px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<PrivateRouter isAllowed={user.status === 'logged'} />}>
            <Route path="/match" element={<SelectMatchPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route
            path="/auth/:authType"
            element={
              <PrivateRouter redirect="/chat" isAllowed={user.status !== 'logged'} >
                <AuthPage />
              </PrivateRouter>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
