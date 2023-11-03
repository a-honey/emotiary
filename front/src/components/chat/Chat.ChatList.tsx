import React from 'react';
import { Socket } from 'socket.io-client';
import ChatRoom from './Chat.ChatRoom';
import styles from './Chat.ChatList.module.scss';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { chatState } from '../../atoms/chatState';

const ChatList = ({ socket }: { socket: Socket }) => {
  const { isOpenChatList, isOpenChatRoom, chatUserId, chatUsername } =
    useRecoilValue(chatState);
  const setChatStateRecoil = useSetRecoilState(chatState);

  const toggleIsOpenChatRoom = () => {
    setChatStateRecoil((prev) => ({
      ...prev,
      isOpenChatRoom: !prev.isOpenChatRoom,
    }));
  };

  if (!isOpenChatList) {
    return null;
  }
  return (
    <>
      {isOpenChatRoom && (
        <ChatRoom
          socket={socket}
          toggleIsOpenChatRoom={toggleIsOpenChatRoom}
          userId={chatUserId}
          username={chatUsername}
        />
      )}
      <div className={styles.container}>
        <button
          className="doneBtn"
          onClick={() => {
            setChatStateRecoil((prev) => ({
              ...prev,
              isOpenChatList: false,
            }));
          }}
        >
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
  const setChatStateRecoil = useSetRecoilState(chatState);

  const handleChatUserIdAndUsername = () => {
    setChatStateRecoil({
      chatUserId: '3',
      chatUsername: '이름',
      isOpenChatList: true,
      isOpenChatRoom: true,
    });
  };

  return (
    <div className={styles.item} onClick={handleChatUserIdAndUsername}>
      user4과의 채팅
    </div>
  );
};
