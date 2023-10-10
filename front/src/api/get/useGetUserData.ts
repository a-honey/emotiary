import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';

//** USERSPAGE 모든 유저 조회 */
export const useGetUsersData = () => {
  return useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const response = await instance.get('/users/allUser');
      return response.data;
    },
  });
};

//** MYPAGE 모든 유저 조회 */
export const useGetMyUserData = () => {
  return useQuery({
    queryKey: ['myUserData'],
    queryFn: async () => {
      const response = await instance.get('/users/current');
      return response.data;
    },
  });
};

//** USERIDPAGE 유저 카드 조회 */
export const useGetUserData = ({ user_id }: { user_id: number }) => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await instance.get(`/users/${user_id}`);
      return response.data;
    },
  });
};
