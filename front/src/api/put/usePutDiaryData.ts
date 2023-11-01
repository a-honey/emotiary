import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { DiaryItemType } from '../get/useGetDiaryData.types';
import { SelectedEmojiType } from './usePutDiaryData.types';

export const usePutDiaryData = (id: string) => {
  const postMutation = useMutation(
    async ({ body }: { body: DiaryItemType }) => {
      return await instance.put(`/diary/${id}`, body);
    },
    {
      onSuccess: () => {},
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePutCommentData = (id: string, done?: () => void) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await instance.put(`/comments/${id}`, body);
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

export const usePutSelectedEmoji = () => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ id, body }: { id: string; body: SelectedEmojiType }) => {
      return await instance.put(`/diary/selectEmotion/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diarysData']);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
