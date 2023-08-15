import { Box } from '@mui/material';
import type { SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import OneChatAsideItem from './OneChatAsideItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAvailableMessages } from '../../redux/slices/availableChats/availableChatThunks';

type Props = {
  setSelectedChat: React.Dispatch<SetStateAction<number>>;
};
export default function AllChatsAsidePart({ setSelectedChat }: Props): JSX.Element {
  const availableChat = useAppSelector((store) => store.availableChat);
  const dispatch = useAppDispatch();
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    void dispatch(fetchAvailableMessages());
  }, []);
  const handleChatItemClick = (chatId): void => {
    setSelectedChat(chatId);
    setActiveChatId(chatId);
  };
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {availableChat.map((oneChat) => (
        <OneChatAsideItem
          key={oneChat.id}
          chatId={oneChat.senderId}
          username={oneChat.sender.profile[0].name}
          setSelectedChat={setSelectedChat}
          onClick={() => handleChatItemClick(oneChat.senderId)}
          activeChatId={activeChatId}
        />
      ))}
    </div>
  );
}
