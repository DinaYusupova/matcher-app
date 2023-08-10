import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import AllChatsAsidePart from '../UI/AllChatsAsidePart';
import CurrentChat from '../UI/CurrentChat';

export default function ChatPage(): JSX.Element {
  useEffect(()=>{
    
    const socket = new WebSocket('ws://localhost:3001');
  },[])
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
