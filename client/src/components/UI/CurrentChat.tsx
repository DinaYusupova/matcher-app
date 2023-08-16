import { Box, Button, TextField, Typography } from '@mui/material';
import type { KeyboardEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addMessage } from '../../redux/slices/messages/ChatSlice';
// добавить кнопку крестика по типу скрыть чат...доп.

type Props = {
  selectedChat: number;
  submitHandler: (input: string, chatId: Props['selectedChat']) => void;
};

export default function CurrentChat({ selectedChat, submitHandler }: Props): JSX.Element {
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const chat = useAppSelector((store) => store.chat);
  const user = useAppSelector((store) => store.user);
  const [messageState, setMessageState] = useState('');
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (messageState.split('').every((el) => el === '\n')) return;
    if (e.key === 'Enter' && e.shiftKey) {
      setMessageState((prev) => `${prev}\n`);
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Предотвращаем перевод строки в поле ввода
      submitHandler(messageState, selectedChat);
      setMessageState(''); // Очищаем поле ввода после отправки сообщения
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const dispatch = useAppDispatch();
  return (
    <>
      <Box>
        {chat.map((el) => (
          <Box
            ref={messagesEndRef}
            key={el.id} // Уникальный ключ для каждого элемента списка
            mt={2}
            sx={{
              backgroundColor: el.senderId === user.id ? 'blue' : 'grey',
              width: 'fit-content',
              padding: '8px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
              marginLeft: el.senderId === user.id ? 'auto' : '10px',
              marginRight: el.senderId === user.id ? '10px' : 'auto',
            }}
          >
            {el.message === null && (
              <Box
                sx={{
                  margin: '0 auto',
                  fontSize: '10px',
                  color: 'gray', // Neutral color
                }}
              >
                таймер чата запущен
              </Box>
            )}{' '}
            <Typography>{el.message}</Typography>
          </Box>
        ))}
      </Box>
      {selectedChat ? (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            submitHandler(data.message, selectedChat);
          }}
          alignItems="center"
          bottom={20}
          mt={2}
          display="flex"
          justifyContent="space-between"
          paddingX={2}
        >
          <TextField
            name="message"
            sx={{
              backgroundColor: 'white',
              overflowY: 'auto',
              maxHeight: 200,
              flexGrow: 1, // Развернуть на всю ширину
            }}
            autoFocus
            fullWidth
            multiline
            value={messageState}
            type="text"
            variant="standard"
            label="type in message"
            onChange={(e) => setMessageState(e.target.value)}
            onKeyDown={handleKeyDown}
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
            send
          </Box>
        </Box>
      ) : (
        `привет`
      )}
    </>
  );
}
