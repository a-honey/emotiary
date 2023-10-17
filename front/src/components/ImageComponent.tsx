import React from 'react';
import user_none from '../assets/user_none.png';
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const imgElement = e.target as HTMLImageElement;

  imgElement.src = user_none; // 이미지 오류시 대체 이미지 설정
  imgElement.alt = '이미지 로드 중 오류 발생'; // 이미지 오류시 대체 alt 설정
};

const ImageComponent = ({ src, alt }: { src: string | null; alt: string }) => {
  return <img src={src ?? user_none} alt={alt} onError={handleImgError} />;
};

export default ImageComponent;
