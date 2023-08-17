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
  avatar, // timer,
}: Props): JSX.Element {
  avatar,
} // timer,
: Props): JSX.Element {
  console.log(avatar);
  return (
    <Box
    onClick={() => {
      if (activeChatId === chatId) {
        setSelectedChat(0);
        setActiveChatId(0); 
      } else {
        setSelectedChat(chatId); // Открыть чат
        setActiveChatId(chatId);
      }
    }}
      mt={2}
      sx={{
        backgroundColor: activeChatId === chatId ? '#ffffff' : '#f9fafc',
        display: 'flex',
        '&:hover': {
          cursor: 'pointer',
        },
        height: '70px',
      }}
      flexDirection="row"
    >
      <Box
        sx={{
          marginLeft: '10px',
          borderRadius: '50%',
          maxWidth: '50px',
          maxHeight: '50px',
          overflow: 'hidden',
          position: 'relative',
        }}
        alignSelf="center"
      >
        <img
          src={`http://localhost:3001/api/userphoto/photos/${avatar}`}
          alt="Описание картинки"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <Box marginLeft={5}>
        <Typography sx={{ marginTop: '23px' }}>{username} </Typography>
      </Box>
    </Box>
  );
}
export default React.memo(OneChatAsideItem);
