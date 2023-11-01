import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { formDataInstance, instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { CommentBodyType, DiaryBodyType } from './usePostDiaryData.types';
import { Error } from '../types';

export interface ResEmojiType {
  emotion: string;
  emoji: string;
}

export const usePostDiaryData = (
  fn?: (emojis: ResEmojiType[], id: string) => void,
) => {
  const postMutation = useMutation(
    async ({ body }: { body: FormData }) => {
      return await formDataInstance.post(`/diary`, body);
    },
    {
      onSuccess: (res) => {
        const resEmotions = res.data.data.emotion;
        const parts = resEmotions.split(', ');
        const setEmojis: { emotion: string; emoji: string }[] = [];

        parts.forEach((part: string) => {
          const [emotion, emoji] = part.split(' : ');
          setEmojis.push({ emotion: emotion.trim(), emoji: emoji.trim() });
        });

        fn?.(setEmojis, res.data.data.id);
        return setEmojis;
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
      onSuccess: (res) => {
        if (res.data.data.emoji) {
          queryClient.invalidateQueries(queryKeys.diaryCommentData({ id }));

          done?.();
        }
      },
      onError: (error: Error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePostLikeDiaryData = ({
  id,
  isNetwork,
}: {
  id: string;
  isNetwork: boolean;
}) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async () => {
      return await instance.post(`/favorites/${id}`);
    },
    {
      onSuccess: () => {
        isNetwork &&
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
