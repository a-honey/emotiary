import React from 'react';

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const imgElement = e.target as HTMLImageElement;

  imgElement.src = '../assets/user_none.png'; // 이미지 오류시 대체 이미지 설정
  imgElement.alt = '이미지 로드 중 오류 발생'; // 이미지 오류시 대체 alt 설정
};

const ImageComponent = ({ src, alt }: { src: string | null; alt: string }) => {
  return <img src={'/user_none.png'} alt={alt} onError={handleImgError} />;
};

export default ImageComponent;
