import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { useNavigate } from 'react-router-dom';

export const usePutSignupData = (queryClient: QueryClient) => {
  const navigate = useNavigate();
  const signupMutation = useMutation(
    async (newUserInfo: { username: string; email: string; password: string }) => {
      const response = await instance.post('/users/register', newUserInfo);
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        console.log('회원가입 성공', data);
        navigate('/signin');
      },
      onError: (error: any) => {
        console.log('회원가입 실패', error);
        alert("회원가입에 실패했습니다! 다시 시도해주세요!");
      },
    }
  );

  return signupMutation;
};
