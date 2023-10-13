import { atom } from 'recoil';

// 사용자 정보를 담는 atom
export const userState = atom({
  key: 'userState',
  default: {
    id: null,
    name: '',
    email: '',
    imgURL: '',
  },
});
