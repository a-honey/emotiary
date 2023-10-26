import React, {useState} from 'react';
import { Socket } from 'socket.io-client';
import ChatRoom from './Chat.ChatRoom';
import styles from './Chat.ChatList.module.scss';

const ChatList = ({socket}: {socket: Socket}) => {
  const [userId, setUserId] = useState("1");
  const [isOpenChatRoom, setIsOpenChatRoom] = useState(false);

  const toggleIsOpenChatRoom = () => {
    setIsOpenChatRoom(prev=>!prev)
  }

  return (
  <>
  {isOpenChatRoom && <ChatRoom socket={socket} toggleIsOpenChatRoom={toggleIsOpenChatRoom} userId={userId}/>}
  <div className={styles.container}>
    <div>채팅목록</div>
    <div onClick={toggleIsOpenChatRoom}>user1과의 채팅</div>
    <div>user2과의 채팅</div>
    <div>user3과의 채팅</div>
    <div>user4과의 채팅</div>
  </div>
  </>)
}

export default ChatList;