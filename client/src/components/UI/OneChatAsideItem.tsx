import { Box, Typography } from '@mui/material';
import type { SetStateAction } from 'react';
import React from 'react';
import type { ProfileType } from '../../types/profileType';

type Props = {
  chatId: number;
  setSelectedChat: React.Dispatch<SetStateAction<number>>;
  username: ProfileType['name'];
};
function OneChatAsideItem({
  activeChatId,
  chatId,
  setSelectedChat,
  username,
  onClick,
}: Props): JSX.Element {
  return (
    <Box
      onClick={onClick}
      mt={2}
      sx={{
        backgroundColor: activeChatId === chatId ? 'red' : 'grey',
        display: 'flex',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      flexDirection="row"
    >
      <Box sx={{ width: '20px', height: '20px' }} alignSelf="center" component="img" src="" />
      <Box>
        <Typography>{username}</Typography>
        <Typography>last message</Typography>
      </Box>
    </Box>
  );
}
export default React.memo(OneChatAsideItem);
