import { atom } from 'recoil';

export const chatState = atom({
  key: 'chatState',
  default: {
    isOpenChatList: false,
    isOpenChatRoom: false,
    chatUserId: '아현',
    chatUsername: '아현',
  },
});
