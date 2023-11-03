import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import styles from './Chat.ChatRoom.module.scss';

const ChatRoom = ({
  socket,
  toggleIsOpenChatRoom,
  userId,
  username,
}: {
  socket: Socket;
  toggleIsOpenChatRoom: () => void;
  userId: string;
  username: string;
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { id: string; sendUserId: string; message: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 빈값이면 if문 종료
    if (!message.trim()) return;

    try {
      // 메시지를 socket에 전송
      // input value 초기화
      await socket?.emit('sendMessage', userId, message);

      setMessages((prev) => [
        ...prev,
        { id: userId, sendUserId: userId, message },
      ]);
      setMessage('');
    } catch (err) {
      console.log('메시지 전송 실패', err);
    }
  };

  console.log('받은 메시지', messages);
  useEffect(() => {
    // 채팅방이 마운트되면 채팅방에 들어감
    console.log('join', userId);
    socket?.emit('join', userId);
    // 채팅방에 들어가면 messages 이벤트에서 이전 내역을 가져옴
    socket?.on(
      'messages',
      (msgs: { id: string; sendUserId: string; message: string }[]) => {
        setMessages((prev) => msgs.map((item) => item));
      }
    );
    socket?.on(
      'newMessage',
      (msgs: { id: string; sendUserId: string; message: string }) => {
        setMessages((prev) => [...prev, msgs]);
      }
    );
  }, [userId, socket]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>{username}님과의 채팅방</div>
        <button className="doneBtn" onClick={toggleIsOpenChatRoom}>
          채팅방 닫기
        </button>
      </div>
      <div className={styles.messageContainer}>
        {messages?.map((item) => (
          <div
            key={item.message}
            className={item.sendUserId === userId ? styles.my : styles.other}
          >
            {item.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
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
