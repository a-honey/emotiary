import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { useNavigate } from 'react-router-dom';

export const usePutSigninData = (
  queryClient: QueryClient,
) => {
  const navigate = useNavigate();
  const signinMutation = useMutation(
    async (userSigninInfos: { email: string; password: string }) => {
      const response = await instance.post('http://localhost:5001/users/login', userSigninInfos);
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        console.log('로그인 성공', data.data);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('username', data.data.name);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userImg', data.data.uploadFile);
        localStorage.setItem('refreshToken', data.data.refreshToken);

        navigate('/');
      },
      onError: (error: any) => {
        console.log('로그인 실패', error);
      },
    },
  );

  return signinMutation;
};