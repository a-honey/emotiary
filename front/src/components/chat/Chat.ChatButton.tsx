import React, { useEffect, useState } from 'react';
import styles from './Chat.ChatButton.module.scss';
import { Socket } from 'socket.io-client';
import ChatList from './Chat.ChatList';
import { useLocation } from 'react-router-dom';

const ChatButton = ({ socket }: { socket: Socket }) => {
  const [isOpenChatList, setIsOpenChatList] = useState(false);

  const location = useLocation();
  const toggleIsOpenChatList = () => {
    setIsOpenChatList((prev) => !prev);
  };

  useEffect(() => {
    setIsOpenChatList(false);
  }, [location.pathname]);

  if (location.pathname === '/mypage') {
    return null;
  }

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
    </>
  );
};

export default ChatButton;
