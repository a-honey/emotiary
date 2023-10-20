import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { useRecoilState } from 'recoil';
import { toastState } from '../../atoms/toastState';

export const usePostFriendReqMutation = (queryClient: QueryClient) => {
  const postMutation = useMutation(
    async ({ id }: { id: string }) => {
      return await instance.post(`/friend/req/${id}`);
    },
    {
      onSuccess: (res) => {
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
