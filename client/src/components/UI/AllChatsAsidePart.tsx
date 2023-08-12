import { Box } from '@mui/material';
import type { SetStateAction } from 'react';
import React from 'react';
import OneChatAsideItem from './OneChatAsideItem';

type Props = {
  setSelectedChat: React.Dispatch<SetStateAction<number>>;
};
export default function AllChatsAsidePart({ setSelectedChat }: Props): JSX.Element {
  const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {arr.map((el, i) => (
        <OneChatAsideItem key={i + 1} chatId={+el} setSelectedChat={setSelectedChat} />
      ))}
    </div>
  );
}
