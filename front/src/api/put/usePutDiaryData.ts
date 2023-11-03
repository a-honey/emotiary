import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { DiaryItemType } from '../get/useGetDiaryData.types';
import { SelectedEmojiType } from './usePutDiaryData.types';
import { audioState } from '../../atoms/audioState';
import { useSetRecoilState } from 'recoil';

export const usePutDiaryData = (id: string) => {
  const postMutation = useMutation(
    async (body: { title: string; content: string }) => {
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

export const usePutDiaryDate = (id: string) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ body }: { body: { createdDate: string } }) => {
      return await instance.put(`/diary/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['calendarDiaryData']);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

export const usePutCommentData = (
  id: string,
  done?: () => void,
  diaryId?: string,
) => {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await instance.put(`/comments/${id}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diaryData', diaryId]);
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
  const setAudioState = useSetRecoilState(audioState);
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ id, body }: { id: string; body: SelectedEmojiType }) => {
      return await instance.put(`/diary/selectEmotion/${id}`, body);
    },
    {
      onSuccess: (res) => {
        setAudioState(res.data.data.audioUrl);
        queryClient.invalidateQueries(['diarysData']);
        queryClient.invalidateQueries(['calendarDiaryData']);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};
