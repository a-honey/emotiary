import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';

export const usePostDiaryData = (
  queryClient: QueryClient,
  handleIsAdding?: () => void,
) => {
  const postMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await instance.post(`/diary`, body);
    },
    {
      onSuccess: (res) => {
        handleIsAdding?.();
        queryClient.invalidateQueries(
          queryKeys.myDiaryData({
            year: new Date(res.data.data.createdDate).getFullYear(),
            month: new Date(res.data.data.createdDate).getMonth() + 1,
          }),
        );
        queryClient.invalidateQueries(queryKeys.myAllDiarysData());
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePostCommentData = (
  queryClient: QueryClient,
  id: string,
  done?: () => void,
) => {
  const postMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await instance.post(`/comments/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.diaryData({ id }));
        done?.();
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
