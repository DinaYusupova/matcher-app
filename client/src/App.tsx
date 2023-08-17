import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import SelectMatchPage from './components/pages/SelectMatchPage';
import AuthPage from './components/pages/AuthPage';
import ChatPage from './components/pages/ChatPage';
import Navigation from './components/UI/Navbar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserAuthThunk } from './redux/slices/userAuth/userAuthThunk';
import PrivateRouter from './components/hocs/PrivateRouter';
import AccountPage from './components/pages/AccountPage';
import OneAccountPage from './components/pages/OneAccountPage';
import TwoAccountPage from './components/pages/TwoAccountPage';
import Loader from './components/hocs/Loader';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(checkUserAuthThunk());
  }, []);
  const [location, setLocation] = useState('');
  return (
    <>
      <Navigation setLocation={setLocation} />
      <Loader isLoading={user.status === 'loading'}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<PrivateRouter redirect="/" isAllowed={user.status === 'logged'} />}>
            <Route path="/chat" element={<ChatPage location={location} />} />
            <Route path="/match" element={<SelectMatchPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/about" element={<OneAccountPage />} />
            <Route path="/account/filter" element={<TwoAccountPage />} />
          </Route>
          <Route
            path="/auth/:authType"
            element={
              <PrivateRouter redirect="/account/about" isAllowed={user.status !== 'logged'}>
                <AuthPage />
              </PrivateRouter>
            }
          />
        </Routes>
      </Loader>
    </>
  );
}

export default App;
