import type { KeyboardEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import type { Props } from '../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addMessage } from '../../redux/slices/messages/ChatSlice';
import logo from '../../img/matcher.png';

export default function CurrentChat({ selectedChat, submitHandler }: Props): JSX.Element {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const chat = useAppSelector((store) => store.chat);
  const user = useAppSelector((store) => store.user);
  const [messageState, setMessageState] = useState('');
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (messageState.split('').every((el) => el === '\n')) return;
    if (e.key === 'Enter' && e.shiftKey) {
      setMessageState((prev) => `${prev}\n`);
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitHandler(messageState, selectedChat);
      setMessageState('');
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Подстройте по необходимости
      }}
    >
      {selectedChat ? (
        <>
          <Box
            ref={messageContainerRef}
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              paddingBottom: '150px',
            }}
          >
            {chat.map((el) =>
              el.message === null ? (
                <Box
                  sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                    color: 'grey',
                  }}
                  key={el.id}
                >
                  начните общение
                </Box>
              ) : (
                <Box
                  key={el.id}
                  mt={2}
                  sx={{
                    backgroundColor: el.senderId === user.id ? '#e8355fa6' : '#a8a3a396',
                    width: 'fit-content',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    marginLeft: el.senderId === user.id ? 'auto' : '10px',
                    marginRight: el.senderId === user.id ? '10px' : 'auto',
                    textAlign: 'left', // Выравнивание текста по левому краю
                    maxWidth: '50%', // Устанавливаем максимальную ширину для сообщений
                    wordWrap: 'break-word', // Переносим текст, если достигнута максимальная ширина
                  }}
                >
                  <Typography sx={{ fontSize: '19px' }}>{el.message}</Typography>
                </Box>
              ),
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              submitHandler(data.message, selectedChat);
            }}
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0, // Изменим на 'right' вместо 'left'
              width: '75%', // Подстройте ширину по необходимости
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: 'white',
              zIndex: 1000,
            }}
          >
            <Box style={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
              <TextField
                name="message"
                sx={{
                  backgroundColor: 'white',
                  overflowY: 'auto',
                  maxHeight: 200,
                  width: '100%', // Занимает всю доступную ширину контейнера
                }}
                autoFocus
                fullWidth
                multiline
                value={messageState}
                type="text"
                variant="outlined"
                onChange={(e) => setMessageState(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#050000', // Цвет кнопки как в Tinder
                  borderRadius: 0,
                  marginTop: '17px',
                  '&:hover': {
                    backgroundColor: '#060000', // Цвет при наведении
                  },
                  fontSize: '15px', // Настройте размер шрифта
                  fontWeight: 'bold', // Настройте жирность шрифта
                  height: '56px',
                  width: '200px',
                }}
              >
                Отправить
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)', // Выравнивание по центру
          }}
        >
          <img
            style={{
              width: '50vh',
            }}
            src={logo}
            alt="logo"
          />
        </div>
      )}
    </Box>
  );
}
