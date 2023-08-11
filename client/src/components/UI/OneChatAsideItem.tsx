import { Box, Typography } from '@mui/material';
import React from 'react';

export default function OneChatAsideItem(): JSX.Element {
  return (
    <Box mt={2} sx={{ display: 'flex' }} flexDirection="row">
      <Box sx={{ width: '20px', height: '20px' }} alignSelf='center' component="img" src="" />
      <Box>
        <Typography>name</Typography>
        <Typography>last message</Typography>
      </Box>
    </Box>
  );
}    
