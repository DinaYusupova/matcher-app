import { Box, Button, Grid, Container } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import AllChatsAsidePart from '../UI/AllChatsAsidePart';
import CurrentChat from '../UI/CurrentChat';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSelectedChatThunk } from '../../redux/slices/messages/ChatThunk';
import { SET_USERS } from '../chatUtils/chatActions';
import { addMessage } from '../../redux/slices/messages/ChatSlice';



export default function ChatPage({ location }): JSX.Element {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((store) => store.chat);
  const socketRef = useRef<WebSocket>();
  console.log(location);
  const [selectedChat, setSelectedChat] = useState<number>(0);
  // if (location !== '/chat') {
  //   setSelectedChat(0);
  // }
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
    setSelectedChat(0);
  }, []);
  useEffect(() => {
    const socket = socketRef.current;
    socketRef.current.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case SET_USERS:
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
    if (selectedChat !== 0) {
      void dispatch(fetchSelectedChatThunk(selectedChat));
    }
  }, [selectedChat]);
  const submitHandler = (input: string, chatId: number): void => {
    // const socket = socketRef.current;
    socketRef.current.send(JSON.stringify({ payload: { input, chatId }, type: 'NEW_MESSAGE' }));
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          backgroundColor: 'darkkhaki',
          borderRadius: '10px',
          minHeight: '80vh',
          flex: '1 1 25%',
          maxWidth: '25%',
        }}
      >
        <AllChatsAsidePart setSelectedChat={setSelectedChat} />
      </Box>
      <Box sx={{ flex: '1 1 75%', maxWidth: '75%', maxHeight: '100vh', overflowY: 'auto' }}>
        {/* {selectedChat && (
          <>
            <Button onClick={() => clearTimeoutService(selectedChat).catch(console.log)}>       
              продолжить общаться
            </Button>
          </>
        )} */}
        <CurrentChat selectedChat={selectedChat} submitHandler={submitHandler} />
      </Box>
    </Box>
  );
}
