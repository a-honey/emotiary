import { selector } from 'recoil';
import { userState } from '../atoms/userState';

// 사용자 ID을 반환하는 Recoil Selector
export const userIdSelector = selector({
  key: 'userIdSelector',
  get: ({ get }) => {
    const user = get(userState); // userState atom을 가져옴
    return user.id; // userState의 name만 반환함
  },
});
