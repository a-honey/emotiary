import { atom } from 'recoil';
import getUserId from '../utils/localStorageHandlers';

export const userIdState = atom({
  key: 'userIdState',
  default: getUserId,
});
