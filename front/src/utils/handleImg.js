export const handleImgError = (e) => {
  e.target.src = '../assets/user_none.png'; // 이미지 오류시 대체 이미지 설정
  e.target.alt = '이미지 로드 중 오류 발생'; // 이미지 오류시 대체 alt 설정
};
