import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
// добавить кнопку крестика по типу скрыть чат...доп.
export default function CurrentChat(): JSX.Element {
  const message = [
    'message maybe with date but not sure',
    'message',
    'not your message',
    'message',
    'message',
    'message',
    'not your message',
    'message',
    'message',
    'message',
    'message',
    'not your message',
    'message',
    'message',
    'message',
    'message',
    'message',
    'message',
    'message',
  ];

  return (
    <>
      {message.map((el) => (
        <Box
          mt={2}
          sx={{
            backgroundColor: el === 'message' ? 'blue' : 'red',
            width: 'fit-content',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginLeft: el === 'message' ? 'auto' : '10px',
            marginRight: el === 'message' ? '10px' : 'auto',
          }}
        >
          <Typography>{el}</Typography>
        </Box>
      ))}
      <Box width="60%" alignItems='center' position="fixed" bottom={20} mt={2} display="flex">
        <TextField
          sx={{
            backgroundColor: 'white',
            flexGrow: 1, // Растянуть поле ввода на всю доступную ширину
            overflowY: 'auto', // Включение вертикальной прокрутки
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
          <Button disableRipple variant="text">
            send
          </Button>
        </Box>
      </Box>
    </>
  );
}
