import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { CommentBodyType, DiaryBodyType } from './usePostDiaryData.types';
import { Error } from '../types';

export const usePostDiaryData = (
  toggleIsOpenModal?: () => void,
  handleChangeEmojis?: (emojis: string) => void,
) => {
  const postMutation = useMutation(
    async ({ body }: { body: DiaryBodyType }) => {
      return await instance.post(`/diary`, body);
    },
    {
      onSuccess: (res) => {
        toggleIsOpenModal?.();
        // VM 에러,, 확인 필요
        console.log('응답데이터', res.data.data);
        handleChangeEmojis?.(res.data.data.emoji);
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePostCommentData = (id: string, done?: () => void) => {
  const queryClient = useQueryClient();
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

export const usePostdLikeDiaryData = (id: string) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async () => {
      return await instance.post(`/favorites/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          queryKeys.diarysData({ emotion: null, select: null, page: null }),
        );
        queryClient.invalidateQueries(queryKeys.diaryData({ id }));
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
