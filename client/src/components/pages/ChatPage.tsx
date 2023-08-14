import { Box, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AllChatsAsidePart from '../UI/AllChatsAsidePart';
import CurrentChat from '../UI/CurrentChat';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSelectedChatThunk } from '../../redux/slices/messages/ChatThunk';
import { SET_USERS } from '../chatUtils/chatActions';
import { addMessage } from '../../redux/slices/messages/ChatSlice';
import { apiService } from '../../services/apiServiceConfig';

export default function ChatPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((store) => store.chat);
  const socketRef = useRef<WebSocket>();
  const [selectedChat, setSelectedChat] = useState<number>(1);
  useEffect(() => {
    socketRef.current = new WebSocket(`ws://localhost:3001`);
    const socket = socketRef.current;
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'init' }));
    };
    socket.onclose = () => {
      socket.send(JSON.stringify({ type: 'close' }));
    };
    socket.onerror = (err) => {
      console.log(err);
    };
    apiService.post('/chat/find/matched');
  }, []);
  useEffect(() => {
    const socket = socketRef.current;
    socketRef.current.onmessage = (event) => {
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
          dispatch(addMessage(payload));
          break;
        default:
          break;
      }
    };
  }, [chat]);
  useEffect(() => {
    void dispatch(fetchSelectedChatThunk(selectedChat));
  }, [selectedChat]);
  const submitHandler = (input: string, chatId: number): void => {
    // const socket = socketRef.current;
    socketRef.current.send(JSON.stringify({ payload: { input, chatId }, type: 'NEW_MESSAGE' }));
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: '1 1 25%', maxWidth: '25%' }}>
        <AllChatsAsidePart setSelectedChat={setSelectedChat} />
      </Box>
      <Box sx={{ flex: '1 1 75%', maxWidth: '75%', maxHeight: '100vh', overflowY: 'auto' }}>
        <CurrentChat selectedChat={selectedChat} submitHandler={submitHandler} />
      </Box>
    </Box>
  );
}
