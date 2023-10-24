import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { MyUserDataType } from './useGetUserData.types';

//** USERSPAGE 모든 유저 조회 */
export const useGetUsersData = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const urlQueryString = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  }).toString();
  return useQuery(queryKeys.usersData(), async () => {
    const response = await instance.get(`/users/allUser?${urlQueryString}`);
    return response.data;
  });
};

//** MYPAGE 모든 유저 조회 */
export const useGetMyUserData = () => {
  return useQuery(queryKeys.myUserData(), async () => {
    const response = await instance.get<{
      data: MyUserDataType;
    }>('/users/current');
    return response.data.data;
  });
};

//** USERIDPAGE 유저 카드 조회 */
export const useGetUserData = ({ user_id }: { user_id: string }) => {
  return useQuery(
    queryKeys.userData(),
    async () => {
      const response = await instance.get(`/users/${user_id}`);
      return response.data;
    },
    { select: (data) => data.data },
  );
};
