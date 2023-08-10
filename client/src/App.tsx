import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import SelectMatchPage from './components/pages/SelectMatchPage';

function App(): JSX.Element {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/match" element={<SelectMatchPage />} />
      </Routes>
    </Container>
  );
}

export default App;
