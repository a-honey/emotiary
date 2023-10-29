import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import ChatRoom from './Chat.ChatRoom';
import styles from './Chat.ChatList.module.scss';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from '../../atoms/chatState';

const ChatList = ({
  socket,
  toggleIsOpenChatList,
}: {
  socket: Socket;
  toggleIsOpenChatList: () => void;
}) => {
  const { isOpenChatRoom, chatUserId } = useRecoilValue(chatState);
  const setChatStateRecoil = useSetRecoilState(chatState);

  const location = useLocation();

  const toggleIsOpenChatRoom = () => {
    setChatStateRecoil((prev) => ({
      ...prev,
      isOpenChatRoom: !prev.isOpenChatRoom,
    }));
  };

  useEffect(() => {
    setChatStateRecoil((prev) => ({
      ...prev,
      isOpenChatList: false,
      isOpenChatRoom: false,
    }));
  }, [location.pathname, setChatStateRecoil]);

  return (
    <>
      {isOpenChatRoom && (
        <ChatRoom
          socket={socket}
          toggleIsOpenChatRoom={toggleIsOpenChatRoom}
          userId={chatUserId}
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
