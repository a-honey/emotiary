import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../instance';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../atoms/toastState';
import { queryKeys } from '../queryKeys';

export const usePostFriendReqMutation = () => {
  const setToastState = useSetRecoilState(toastState);
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.post(`/friend/req/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(queryKeys.sentFriends());
        setToastState((oldToastState) => [
          ...oldToastState,
          {
            message: `친구요청에 성공하였습니다.`,
          },
        ]);
      },
      onError: (error: any) => {
        if (error.response?.data?.message) {
          setToastState((oldToastState) => [
            ...oldToastState,
            {
              message: `이미 친구요청을 신청했습니다.`,
            },
          ]);
        }
      },
    },
  );

  return postMutation;
};

//* 친구 목록에서 친구 수락 */
export const useAcceptFriendReqMutation = () => {
  const setToastState = useSetRecoilState(toastState);
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.post(`/friend/accept/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(queryKeys.receivedFriends());
        setToastState((oldState) => [
          ...oldState,
          {
            message: `친구요청을 수락하였습니다.`,
          },
        ]);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return postMutation;
};

//* 친구 목록에서 친구 거절 */
export const useRejectFriendReqMutation = () => {
  const setToastState = useSetRecoilState(toastState);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.delete(`/friend/reject/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(queryKeys.receivedFriends());
        setToastState((oldState) => [
          ...oldState,
          {
            message: `친구요청을 거절하였습니다.`,
          },
        ]);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return deleteMutation;
};

//* 친구 목록에서 친구 취소 */
export const useCancelFriendReqMutation = () => {
  const setToastState = useSetRecoilState(toastState);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.delete(`/friend/req/drop/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(queryKeys.sentFriends());
        setToastState((oldState) => [
          ...oldState,
          {
            message: `친구요청을 취소하였습니다.`,
          },
        ]);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return deleteMutation;
};
