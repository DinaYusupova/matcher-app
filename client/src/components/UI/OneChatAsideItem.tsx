import { Box, Typography } from '@mui/material';
import type { SetStateAction } from 'react';
import React from 'react';

type Props = {
  chatId: number;
  setSelectedChat: React.Dispatch<SetStateAction<number>>;
};
export default function OneChatAsideItem({ chatId, setSelectedChat }: Props): JSX.Element {
  return (
    <Box
      onClick={() => {
        setSelectedChat(chatId);
      }}
      mt={2}
      sx={{
        display: 'flex',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      flexDirection="row"
    >
      <Box sx={{ width: '20px', height: '20px' }} alignSelf="center" component="img" src="" />
      <Box>
        <Typography>{chatId}</Typography>
        <Typography>last message</Typography>
      </Box>
    </Box>
  );
}
