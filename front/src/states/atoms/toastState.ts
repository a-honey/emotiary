import { atom } from 'recoil';

// messages를 담음
export const toastState = atom({
  key: 'toastState',
  default: [{ id: 1, message: '12' }],
});
