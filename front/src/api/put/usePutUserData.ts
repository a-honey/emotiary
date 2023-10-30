import { QueryClient, useMutation } from '@tanstack/react-query';
import { formDataInstance } from '../instance';
import { queryKeys } from '../queryKeys';
import { UserItemType } from '../get/useGetUserData.types';

export const usePutUserData = (
  queryClient: QueryClient,
  id: string,
  fn?: () => void,
) => {
  const putMutation = useMutation(
    async ({ body }: { body: any }) => {
      const response = await formDataInstance.put(`/users/${id}`, body);
      return response.data;
    },
    {
      onSuccess: (data: { data: UserItemType }) => {
        fn?.();
        localStorage.removeItem('userImg');
        localStorage.setItem(
          'userImg',
          data.data.filesUpload[data.data.filesUpload.length - 1].url,
        );
        queryClient.invalidateQueries(queryKeys.myUserData());
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return putMutation;
};
