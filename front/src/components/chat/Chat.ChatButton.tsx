import React, {useState} from 'react';
import styles from './Chat.ChatButton.module.scss';
import { Socket } from 'socket.io-client';
import ChatList from './Chat.ChatList';

const ChatButton = ({ socket }: { socket: Socket }) => {
  const [isOpenChatList, setIsOpenChatList] = useState(false);

  const toggleIsOpenChatList = () => {
    setIsOpenChatList(prev=>!prev)
  }

  return <>
  {isOpenChatList && <ChatList socket={socket} />}
  <button className={`${styles.chatBtn} doneBtn`} onClick={toggleIsOpenChatList}>채팅목록</button>
  </>
};

export default ChatButton;
