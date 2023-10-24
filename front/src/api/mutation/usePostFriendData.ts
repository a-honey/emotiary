import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../atoms/toastState';

export const usePostFriendReqMutation = (queryClient: QueryClient) => {
  const setState = useSetRecoilState(toastState);

  const postMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.post(`/friend/req/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries([
          'myDiaryData',
          new Date(res.data.data.createdDate).getFullYear(),
          new Date(res.data.data.createdDate).getMonth() + 1,
        ]);
        queryClient.invalidateQueries(['myAllDiarysData']);
        setState((oldState) => [
          ...oldState,
          {
            message: `${res.data.data.username} 에게 친구요청 성공하였습니다.`,
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

//* 친구 목록에서 친구 수락 */
export const useAcceptFriendReqMutation = (queryClient: QueryClient) => {
  const setState = useSetRecoilState(toastState);

  const postMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.post(`/friend/accept/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['friendListData']);
        setState((oldState) => [
          ...oldState,
          {
            message: `${res.data.data.username}의 친구요청을 수락하였습니다.`,
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
export const useRejectFriendReqMutation = (queryClient: QueryClient) => {
  const setState = useSetRecoilState(toastState);

  const deleteMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.delete(`/friend/reject/${id}`);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['friendListData']);
        setState((oldState) => [
          ...oldState,
          {
            message: `${res.data.data.username}의 친구요청을 거절하였습니다.`,
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
