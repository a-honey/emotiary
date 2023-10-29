import React, { useEffect, useState } from 'react';
import styles from './Chat.ChatButton.module.scss';
import { Socket } from 'socket.io-client';
import ChatList from './Chat.ChatList';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from '../../atoms/chatState';

const ChatButton = ({ socket }: { socket: Socket }) => {
  const isOpenChatList = useRecoilValue(chatState).isOpenChatList;
  const setIsOpenChatList = useSetRecoilState(chatState);

  const [isNewMessage, setIsNewMessage] = useState(false);

  const location = useLocation();
  const toggleIsOpenChatList = () => {
    setIsOpenChatList((prev) => ({
      ...prev,
      isOpenChatList: !prev.isOpenChatList,
    }));
    setIsNewMessage(false);
  };

  useEffect(() => {
    setIsOpenChatList((prev) => ({ ...prev, isOpenChatList: false }));
  }, [location.pathname, setIsOpenChatList]);

  if (location.pathname === '/mypage') {
    return null;
  }

  socket?.on('sendMessage', () => {
    setIsNewMessage(true);
  });

  return (
    <>
      {isOpenChatList && (
        <ChatList socket={socket} toggleIsOpenChatList={toggleIsOpenChatList} />
      )}
      <button
        className={`${styles.chatBtn} doneBtn`}
        onClick={toggleIsOpenChatList}
      >
        채팅목록
      </button>
      {isNewMessage && <div className={styles.new} />}
    </>
  );
};

export default ChatButton;
