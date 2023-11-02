import { QueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { useNavigate } from 'react-router-dom';

export const usePutSigninData = (queryClient: QueryClient) => {
  const navigate = useNavigate();
  const signinMutation = useMutation(
    async (userSigninInfos: { email: string; password: string }) => {
      const response = await instance.post('/users/login', userSigninInfos);
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        console.log('로그인 성공', data.data);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('username', data.data.name);
        localStorage.setItem('token', data.data.token);
        // VM 에러 확인 필요
        // 키 명 변경된건지 모르겠음
        // 프로필 이미지 받아와서 로컬스토리지에 위치만 넣음
        localStorage.setItem(
          'userImg',
          data.data?.filesUpload?.length > 0
            ? data.data.filesUpload[data.data.filesUpload.length - 1].url
            : null,
        );
        localStorage.setItem('refreshToken', data.data.refreshToken);

        navigate('/main');
      },
      onError: (error: any) => {
        console.log('로그인 실패', error);
        alert("로그인에 실패했습니다! 다시 시도해주세요!");
      },
    },
  );

  return signinMutation;
};
