import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addMessage } from '../../redux/slices/messages/ChatSlice';
// добавить кнопку крестика по типу скрыть чат...доп.
export default function CurrentChat({ submitHandler }): JSX.Element {
  // const message = [
  //   'message maybe with date but not sure',
  //   'message',
  //   'not your message',
  //   'message',
  //   'message',
  //   'message',
  //   'not your message',
  //   'message',
  //   'message',
  //   'message',
  //   'message',
  //   'not your message',
  //   'message',
  //   'message',
  //   'message',
  //   'message',
  //   'message',
  //   'message',
  //   'message',
  // ];
  const chat = useAppSelector((store) => store.chat);
  const user = useAppSelector((store) => store.user);
  console.log('current chat log', chat);
  const dispatch = useAppDispatch();
  return (
    <>
      {chat.map((el) => (
        <Box
          mt={2}
          sx={{
            backgroundColor: el.senderId === user.id ? 'blue' : 'red',
            width: 'fit-content',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginLeft: el.senderId === user.id ? 'auto' : '10px',
            marginRight: el.senderId === user.id ? '10px' : 'auto',
          }}
        >
          <Typography>{el.message}</Typography>
        </Box>
      ))}
      <Box
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget));
          submitHandler(data.message);
          dispatch(addMessage(data.message));
        }}
        component="form"
        width="60%"
        alignItems="center"
        position="fixed"
        bottom={20}
        mt={2}
        display="flex"
      >
        <TextField
          name="message"
          sx={{
            backgroundColor: 'white',
            flexGrow: 1,
            overflowY: 'auto',
            maxHeight: 200,
            margin: '0 0 0 20px',
          }}
          autoFocus
          fullWidth
          multiline
          variant="standard"
          label="type in message"
        />
        <Box
          component="button"
          type="submit"
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxHeight={40}
          width={100}
          sx={{
            backgroundColor: 'purple',
            borderRadius: 3,
            marginLeft: 2,
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <div>send</div>
        </Box>
      </Box>
    </>
  );
}
