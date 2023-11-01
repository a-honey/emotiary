import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';

export const useGetCommentData = ({ id }: { id: string }) => {
  return useQuery(
    queryKeys.diaryCommentData({ id }),
    async () => {
      const response = await instance.get(`/comments/${id}`);
      return response.data;
    },
    { select: (data) => data.data },
  );
};
