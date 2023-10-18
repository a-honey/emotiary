import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';

export const usePostDiaryData = (
  queryClient: QueryClient,
  id: string,
  handleIsOpenDiaryWriting: () => void,
) => {
  const postMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await instance.post(`/diary/${id}`, body);
    },
    {
      onSuccess: () => {
        handleIsOpenDiaryWriting();
        queryClient.invalidateQueries(['myDiaryData', 'myAllDiarysData']);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePostCommentData = (queryClient: QueryClient, id: string) => {
  const postMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await instance.post(`/comments/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diaryData', id]);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
