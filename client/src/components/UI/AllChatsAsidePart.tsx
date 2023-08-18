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

  return (
    <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {availableChat.map((oneChat, i) => {
        const isCurrentUserSender = user.id === oneChat.senderId;
        const isCurrentUserRecipient = user.id === oneChat.recipientId;
        const chatUsername = isCurrentUserSender
          ? oneChat.recipient.profile[0].name
          : oneChat.sender.profile[0].name;
        
        let chatAvatar = "questionmark.png";
        if (isCurrentUserSender) {
          chatAvatar = oneChat.recipient.photo[0]?.photo;
        } else if (isCurrentUserRecipient) {
          chatAvatar = oneChat.sender.photo[0]?.photo;
        }
        
        return (
          <OneChatAsideItem
            key={oneChat.id}
            chatId={isCurrentUserSender ? oneChat.recipientId : oneChat.senderId}
            username={chatUsername}
            setSelectedChat={setSelectedChat}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            avatar={chatAvatar}
          />
        );
      })}
    </div>
  );
}
