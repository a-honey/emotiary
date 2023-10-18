import { atom } from 'recoil';

type ToastMessage = {
  message: string;
};

// messages를 담음
export const toastState = atom<ToastMessage[]>({
  key: 'toastState',
  default: [],
});
