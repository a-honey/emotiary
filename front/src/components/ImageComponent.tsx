import React from 'react';
import user_none from '../assets/user_none.png';
import { handleImgError } from '../utils/imgHandlers';

const ImageComponent = ({ src, alt }: { src: string | null; alt: string }) => {
  return (
    <img
      src={src ? `${process.env.REACT_APP_BASE_URL}/${src}` : user_none}
      alt={alt}
      onError={handleImgError}
    />
  );
};

// 이미지 여러개 혹은 비디오
export const ImagePostComponent = ({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) => {
  return <img src={src ?? user_none} alt={alt} onError={handleImgError} />;
};

export default ImageComponent;
