import { useState, useRef, ChangeEvent } from 'react';

const useImgChange = () => {
  const [imgContainer, setImgContainer] = useState<File | null>(null);
  // src를 변경할 요소(useRef 객체)
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];

    if (imgRef.current && !img) {
      imgRef.current.src = '';
      return;
    }

    if (img) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          if (imgRef.current && typeof reader.result === 'string') {
            imgRef.current.src = reader.result;
          }
        };

        reader.readAsDataURL(img);
        setImgContainer(img);
      } catch (e) {
        alert(e);
      }
    }
  };

  return { handleImgChange, imgContainer, imgRef };
};

export default useImgChange;
