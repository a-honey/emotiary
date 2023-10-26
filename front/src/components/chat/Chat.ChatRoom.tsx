import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import styles from './Chat.ChatRoom.module.scss';

const ChatRoom = ({
  socket,
  toggleIsOpenChatRoom,
  userId,
}: {
  socket: Socket;
  toggleIsOpenChatRoom: () => void;
  userId: string;
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 빈값이면 if문 종료
    if (!message.trim()) return;

    try {
      // 메시지를 socket에 전송
      await socket.emit('sendMessage', userId, message);
      // input value 초기화
      setMessage('');
    } catch (err) {
      console.log('메시지 전송 실패', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>{userId}님과의 채팅방</div>
        <button className="doneBtn" onClick={toggleIsOpenChatRoom}>
          채팅방 닫기
        </button>
      </div>
      <div className={styles.messageContainer}>
        <div>보낸 메시지</div>
        <div>보낸 메시지</div>
        <div>보낸 메시지</div>
        <div>받은 메시지</div>
        <div>보낸 메시지</div>
        <div>보낸 메시지</div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <button type="submit" className="doneBtn">
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
