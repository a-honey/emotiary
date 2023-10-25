import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';

export const useGetCommentData = ({ id }: { id: string }) => {
  return useQuery(
    ['diaryCommentData', id],
    async () => {
      const response = await instance.get(`/comments/${id}`);
      return response.data;
    },
    { select: (data) => data.data },
  );
};
