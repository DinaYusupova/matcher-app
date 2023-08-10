import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';

function App(): JSX.Element {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Container>
  );
}

export default App;
