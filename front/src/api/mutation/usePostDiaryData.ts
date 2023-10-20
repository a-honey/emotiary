import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';

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
        queryClient.invalidateQueries([
          'myDiaryData',
          res.data.data.createdDate.split('T')[0].split('-')[0],
          res.data.data.createdDate.split('T')[0].split('-')[1],
        ]);
        queryClient.invalidateQueries(['myAllDiarysData']);
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
        queryClient.invalidateQueries(['diaryData', id]);
        done?.();
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
