import { selector } from 'recoil';
import { userState } from '../atoms/userState';

// 사용자 이름을 반환하는 Recoil Selector
export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({ get }) => {
    const user = get(userState); // userState atom을 가져옴
    return user.name; // userState의 name만 반환함
  },
});
