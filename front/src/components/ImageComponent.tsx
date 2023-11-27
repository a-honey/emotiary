import React from 'react';
import user_none from '../assets/user_none.png';
import post_none from '../assets/post_none.png';
import { handleImgError } from '../utils/imgHandlers';

const ImageComponent = ({ src, alt }: { src: string | null; alt: string }) => {
  if (src?.endsWith('.mp4')) {
    return (
      <video
        width={300}
        height={300}
        controls
        src={`${process.env.REACT_APP_BASE_URL}/${src}`}
      />
    );
  }
  return <img src={src ? src : user_none} alt={alt} onError={handleImgError} />;
};

// 이미지 여러개 혹은 비디오
export const ImagePostComponent = ({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) => {
  return <img src={src ?? post_none} alt={alt} onError={handleImgError} />;
};

export default ImageComponent;
