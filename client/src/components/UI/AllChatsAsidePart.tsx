import { Box } from '@mui/material';
import React from 'react';
import OneChatAsideItem from './OneChatAsideItem';

export default function AllChatsAsidePart(): JSX.Element {
  const arr = ['1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3', '1', '2', '3'];
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {arr.map((el) => (
        <OneChatAsideItem />
      ))}
    </div>
  );
}
