import { atom } from 'recoil';

// 게시글 작성한 후 audio url를 전역상태으로 저장
// 레이아웃 위에서 띄우거나 useMemo로 렌더링 방지
export const audioState = atom({
  key: 'audioState',
  default: '',
});
