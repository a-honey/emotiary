import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';

export const useGetCommentData = ({ id }: { id: string }) => {
  return useQuery(
    queryKeys.diaryCommentData({ id }),
    async () => {
      const response = await instance.get(
        `/comments/25602ce5-a789-4d57-9280-8c27347f2a60`
      );
      return response.data;
    },
    { select: (data) => data.data }
  );
};
