import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';

//** 친구요청목록 조회 ['sentFriends'], ['receivedFriends'] */
export const useGetFriendData = (kind: string) => {
  return useQuery([`${kind}Friends`], async () => {
    const response = await instance.get(`/friend/${kind}`);
    return response.data;
  });
};
