import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { ReceivedUserDataType } from './useGetFriendData.types';

//** 친구요청목록 조회 ['sentFriends'], ['receivedFriends'] */
export const useGetFriendData = ({
  userReqListType,
}: {
  userReqListType: 'sent' | 'received';
}) => {
  return useQuery(
    userReqListType === 'sent'
      ? queryKeys.sentFriends()
      : queryKeys.receivedFriends(),
    async () => {
      const response = await instance.get<{
        data: ReceivedUserDataType[];
        status: number;
        message: string;
      }>(`/friend/${userReqListType}/list`);
      return response.data;
    },
  );
};
