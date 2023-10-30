import { useState, useRef, ChangeEvent, DragEvent } from 'react';

const useImgChange = (handleAddImgsContainer?: (img: File) => void) => {
  const [imgContainer, setImgContainer] = useState<File | null>(null);
  // src를 변경할 요소(useRef 객체)
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImgChange = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>,
  ) => {
    let img: File | null = null;

    if (
      'dataTransfer' in e &&
      e.dataTransfer?.files &&
      e.dataTransfer.files.length > 0
    ) {
      // 드래그 앤 드롭 이벤트에서 파일 가져오기
      if (e.dataTransfer && e.dataTransfer.files) {
        img = e.dataTransfer.files[0];
      }
    } else if (e.target instanceof HTMLInputElement && e.target.files) {
      // 파일 입력 필드에서 파일 가져오기
      img = e.target.files[0];
    }
    if (imgRef.current && !img) {
      imgRef.current.src = '/user_none.png';
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
        handleAddImgsContainer?.(img);
      } catch (e) {
        alert(e);
      }
    }
  };

  return { handleImgChange, imgContainer, imgRef };
};

export default useImgChange;
