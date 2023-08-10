import { Box, Grid } from '@mui/material';
import React from 'react';
import AllChatsAsidePart from '../UI/AllChatsAsidePart';
import CurrentChat from '../UI/CurrentChat';

export default function ChatPage(): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: '1 1 25%', maxWidth: '25%' }}>
        <AllChatsAsidePart />
      </Box>
      <Box sx={{ flex: '1 1 75%', maxWidth: '75%', maxHeight: '100vh', overflowY: 'auto' }}>
        <CurrentChat />
      </Box>
    </Box>
  );
}
