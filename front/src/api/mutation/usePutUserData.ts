import { QueryClient, useMutation } from '@tanstack/react-query';
import { formDataInstance } from '../instance';

export const usePutUserData = (
  queryClient: QueryClient,
  id: string,
  handleIsAdding?: () => void,
) => {
  const putMutation = useMutation(
    async ({ body }: { body: any }) => {
      return await formDataInstance.put(`/users/${id}`, body);
    },
    {
      onSuccess: () => {
        handleIsAdding?.();
        queryClient.invalidateQueries(['myUserData']);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  return putMutation;
};
