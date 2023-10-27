import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { CommentBodyType, DiaryBodyType } from './usePostDiaryData.types';
import { Error } from '../types';

export const usePostDiaryData = (
  queryClient: QueryClient,
  toggleIsOpenModal?: () => void,
) => {
  const postMutation = useMutation(
    async ({ body }: { body: DiaryBodyType }) => {
      return await instance.post(`/diary`, body);
    },
    {
      onSuccess: (res) => {
        // res.data.idres.data.emotion으로 오는데, emotion 하나를 골라서
        toggleIsOpenModal?.();
      },
      onError: (error: Error) => {
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
    async ({ body }: { body: CommentBodyType }) => {
      return await instance.post(`/comments/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.diaryData({ id }));
        done?.();
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
