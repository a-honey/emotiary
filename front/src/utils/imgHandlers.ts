export const handleImgError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  const imgElement = e.target as HTMLImageElement;

  imgElement.src = ''; // 이미지 오류시 대체 이미지 설정../assets/user_none.png
  imgElement.alt = '이미지 로드 중 오류 발생'; // 이미지 오류시 대체 alt 설정
};
