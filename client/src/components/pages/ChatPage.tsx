import { Box, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AllChatsAsidePart from '../UI/AllChatsAsidePart';
import CurrentChat from '../UI/CurrentChat';
import { useAppDispatch } from '../../redux/hooks';
import { fetchSelectedChatThunk } from '../../redux/slices/messages/ChatThunk';
import { ADD_MESSAGE, SET_USERS } from '../chatUtils/chatActions';
import { addMessage } from '../../redux/slices/messages/ChatSlice';

export default function ChatPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://localhost:3001`);
    const socket = socketRef.current;
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'init' }));
    };
    socket.onclose = () => {
      socket.send(JSON.stringify({ type: 'close' }));
    };
    socket.onmessage = (event) => {
      console.log(event);
      const { type, payload } = JSON.parse(event.data);
      console.log(
        type,
        payload,
        'проверка пейлоада и типа после того как сервер отправил add message',
      );
      switch (type) {
        case SET_USERS:
          console.log('все юзеры онлайн с бэка', payload);
          break;
        case 'ADD_MESSAGE':
          console.log('отправленный с бека пейлоад с сообщением', payload);
          // dispatch(addMessage(payload));
          break;
        default:
          break;
      }
    };
    socket.onerror = (err) => {
      console.log(err);
    };
    void dispatch(fetchSelectedChatThunk(2));
  }, []);
  const submitHandler = (input) => {
    // const socket = socketRef.current;
    socketRef.current.send(JSON.stringify({ payload: input, type: 'NEW_MESSAGE' }));
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: '1 1 25%', maxWidth: '25%' }}>
        <AllChatsAsidePart />
      </Box>
      <Box sx={{ flex: '1 1 75%', maxWidth: '75%', maxHeight: '100vh', overflowY: 'auto' }}>
        <CurrentChat submitHandler={submitHandler} />
      </Box>
    </Box>
  );
}
