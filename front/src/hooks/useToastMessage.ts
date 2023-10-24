import { useSetRecoilState } from 'recoil';
import { toastState } from '../atoms/toastState';

export const useToastMessage = (name: string) => {
  const setToastMessage = useSetRecoilState(toastState);
  // 친구요청을 성공했을때
  setToastMessage((oldState) => [
    ...oldState,
    { message: `${name}에게 친구요청 성공하였습니다.` },
  ]);
  // 이미 했을 때
  setToastMessage((oldState: any) => [
    ...oldState,
    { message: `${name}에게 이미 친구요청을 하였습니다.` },
  ]);
  return;
};
