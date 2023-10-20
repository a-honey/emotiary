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
      onSuccess: () => {
        handleIsAdding?.();
        queryClient.invalidateQueries(['myDiaryData', 'myAllDiarysData']);
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
