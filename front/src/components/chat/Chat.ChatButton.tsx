import React, { useEffect, useState } from 'react';
import styles from './Chat.ChatButton.module.scss';
import { Socket } from 'socket.io-client';
import ChatList from './Chat.ChatList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from '../../atoms/chatState';
import { useLocation } from 'react-router-dom';

const ChatButton = ({ socket }: { socket: Socket }) => {
  const isOpenChatList = useRecoilValue(chatState).isOpenChatList;
  const setIsOpenChatList = useSetRecoilState(chatState);

  const location = useLocation();

  const [isNewMessage, setIsNewMessage] = useState(false);

  socket?.on('sendMessage', () => {
    setIsNewMessage(true);
  });

  useEffect(() => {
    setIsOpenChatList((prev) => ({
      ...prev,
      isOpenChatRoom: false,
      isOpenChatList: false,
    }));
  }, [setIsOpenChatList, location.pathname]);

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
