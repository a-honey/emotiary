import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';

//** 친구요청목록 조회 ['sentFriends'], ['receivedFriends'] */
export const useGetFriendData = ({
  userReqListType,
}: {
  userReqListType: 'sent' | 'received';
}) => {
  return useQuery(
    [`${userReqListType}Friends`],
    async () => {
      const response = await instance.get(`/friend/${userReqListType}`);
      return response.data;
    },
    { select: (data) => data.data },
  );
};
