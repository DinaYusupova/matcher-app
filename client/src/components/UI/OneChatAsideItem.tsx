import { Box, Typography } from '@mui/material';
import type { SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import type { ProfileType } from '../../types/profileType';
import type { AccountPhotoType } from '../../types/accountPhotoType';
import { useAppSelector } from '../../redux/hooks';
import TimerOnChat from './timerOnChat';

type Props = {
  chatId: number;
  setSelectedChat: React.Dispatch<SetStateAction<number>>;
  username: ProfileType['name'];
  avatar: AccountPhotoType['photo'];
};
function OneChatAsideItem({
  activeChatId,
  chatId,
  setSelectedChat,
  username,
  setActiveChatId,
  avatar,
  // timer,
}: Props): JSX.Element {
  console.log(avatar);
  return (
    <Box
      onClick={() => {
        setSelectedChat(chatId);
        setActiveChatId(chatId);
      }}
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
      <Box
        sx={{ marginLeft: '10px', borderRadius: '50%', width: '50px', height: '50px' }}
        alignSelf="center"
        component="img"
        src={`http://localhost:3001/api/userphoto/photos/${avatar}`}
      />
      <Box marginLeft={5}>
        <Typography>{username}</Typography>
        {/* <Typography>last message</Typography> */}
        {/* <TimerOnChat timer={timer} /> */}
      </Box>
    </Box>
  );
}
export default React.memo(OneChatAsideItem);
