import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';

export const useDeleteDiaryData = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async () => {
      return await instance.delete(`/diary/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(
          queryKeys.diarysData({ emotion: null, select: null, page: null }),
        );
        queryClient.invalidateQueries(['calendarDiaryData']);
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return deleteMutation;
};
