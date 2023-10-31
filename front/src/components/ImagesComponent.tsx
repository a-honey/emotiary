import React, { useEffect, useState } from 'react';
import styles from './ImagesComponent.module.scss';

const ImagesComponent = ({ imgDatas }: { imgDatas: { url: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imgsData = [...imgDatas, imgDatas[0]];

  // requestAnimationFrame으로 바꿀 수 있을듯?
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgsData.length);
      },
      currentIndex === currentIndex * imgsData.length ? 0 : 4000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, imgsData.length]);

  return (
    <div className={styles.container}>
      <div
        style={{
          transform:
            currentIndex === currentIndex * imgsData.length
              ? 'translateX(0%)'
              : `translateX(-${currentIndex * 100}%)`,
          transition:
            currentIndex === currentIndex * imgsData.length
              ? 'transform 0s ease'
              : 'transform 1s ease',
        }}
        className={styles.imgsWrapper}
      >
        {imgsData.map((img) => (
          <img
            key={img.url}
            src={`${process.env.REACT_APP_BASE_URL}/${img.url}`}
            alt={img.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesComponent;
