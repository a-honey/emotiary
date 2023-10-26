import React from 'react';
import styles from './Chat.ChatButton.module.scss';
import { Socket } from 'socket.io-client';

const ChatButton = ({ socket }: { socket: Socket }) => {
  return <button className={`${styles.chatBtn} doneBtn`}>채팅목록</button>;
};

export default ChatButton;
