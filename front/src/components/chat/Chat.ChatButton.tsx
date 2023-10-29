import React, { useState } from 'react';
import styles from './Chat.ChatButton.module.scss';
import { Socket } from 'socket.io-client';
import ChatList from './Chat.ChatList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from '../../atoms/chatState';
import useCallByLocation from '../../hooks/useCallByLocation';

const ChatButton = ({ socket }: { socket: Socket }) => {
  const isOpenChatList = useRecoilValue(chatState).isOpenChatList;
  const setIsOpenChatList = useSetRecoilState(chatState);

  const [isNewMessage, setIsNewMessage] = useState(false);

  socket?.on('sendMessage', () => {
    setIsNewMessage(true);
  });

  return (
    <>
      {isOpenChatList ? (
        <ChatList socket={socket} />
      ) : (
        <button
          className={`${styles.chatBtn} doneBtn`}
          onClick={() => {
            setIsOpenChatList((prev) => ({
              ...prev,
              isOpenChatList: !prev.isOpenChatList,
            }));
          }}
        >
          채팅목록
        </button>
      )}

      {isNewMessage && <div className={styles.new} />}
    </>
  );
};

export default ChatButton;
