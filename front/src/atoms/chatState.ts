import { atom } from 'recoil';

export const chatState = atom({
  key: 'chatState',
  default: {
    isOpenChatList: false,
    isOpenChatRoom: false,
    chatUserId: '',
    chatUsername: '',
  },
});
