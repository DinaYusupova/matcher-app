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
  const user = useAppSelector((store) => store.user);

  useEffect(() => {
    void dispatch(fetchAvailableMessages());
  }, []);
  const handleChatItemClick = (chatId): void => {
    setSelectedChat(chatId);
    setActiveChatId(chatId);
  };
  
  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {availableChat.map((oneChat, i) => (
          <OneChatAsideItem
            key={oneChat.id}
            chatId={user.id == oneChat.senderId ? oneChat.recipientId : oneChat.senderId}
            username={
              user.id === oneChat.senderId
                ? oneChat.recipient.profile[0].name
                : oneChat.sender.profile[0].name
            }
            // timer={oneChat.createdAt}
            setSelectedChat={setSelectedChat}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            

            avatar={
              user.id !== oneChat.recipientId
                ? oneChat.recipient.photo[0].photo
                : oneChat.sender.photo[0].photo
            }
          />
        ))}
    </div>
  );
}
