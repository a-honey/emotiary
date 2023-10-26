import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import ChatRoom from './Chat.ChatRoom';
import styles from './Chat.ChatList.module.scss';
import { useLocation } from 'react-router-dom';

const ChatList = ({
  socket,
  toggleIsOpenChatList,
}: {
  socket: Socket;
  toggleIsOpenChatList: () => void;
}) => {
  const [userId, setUserId] = useState('1');
  const [isOpenChatRoom, setIsOpenChatRoom] = useState(false);

  const location = useLocation();
  const toggleIsOpenChatRoom = () => {
    setIsOpenChatRoom((prev) => !prev);
  };

  useEffect(() => {
    setIsOpenChatRoom(false);
  }, [location.pathname]);

  return (
    <>
      {isOpenChatRoom && (
        <ChatRoom
          socket={socket}
          toggleIsOpenChatRoom={toggleIsOpenChatRoom}
          userId={userId}
        />
      )}
      <div className={styles.container}>
        <button className="doneBtn" onClick={toggleIsOpenChatList}>
          채팅목록닫기
        </button>

        <div onClick={toggleIsOpenChatRoom}>user1과의 채팅</div>
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </div>
    </>
  );
};

export default ChatList;

const ChatListItem = () => {
  return <div className={styles.item}>user4과의 채팅</div>;
};
