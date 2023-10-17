import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';

//** USERSPAGE 모든 유저 조회 */
export const useGetUsersData = () => {
  return useQuery(
    ['usersData'],
    async () => {
      const response = await instance.get('/users/allUser');
      return response.data;
    },
    { select: (data) => data.data },
  );
};

//** MYPAGE 모든 유저 조회 */
export const useGetMyUserData = () => {
  return useQuery(['myUserData'], async () => {
    const response = await instance.get('/users/current');
    return response.data.data;
  });
};

//** USERIDPAGE 유저 카드 조회 */
export const useGetUserData = ({ user_id }: { user_id: number }) => {
  return useQuery(
    ['userData'],
    async () => {
      const response = await instance.get(`/users/${user_id}`);
      return response.data;
    },
    { select: (data) => data.data },
  );
};
