import React, { FormEvent, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

const Analysis: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);

  // 애니메이션 효과 함수
  const startSequence = (targetImage: string) => {
    let transitionSequence: string[] = [];

    if (targetImage === '/cherry1.png') {
      transitionSequence = ['/cherry3.png', '/cherry1.png'];
    } else if (targetImage === '/cherry2.png') {
      transitionSequence = ['/cherry3.png', '/cherry2.png'];
    } else if (targetImage === '/cherry3.png') {
      transitionSequence = ['/cherry1.png', '/cherry3.png'];
    }

    setCurrentImage(transitionSequence[0]);
    setNextImage(transitionSequence[1]);

    const transition = () => {
      if (nextImage) {
        setCurrentImage(nextImage);
      }
      transitionSequence.shift();

      if (transitionSequence.length > 0) {
        setNextImage(transitionSequence[0]);
      }

      setTimeout(transition, 2000);
    };

    setTimeout(transition, 2000);
  };

  const startSequenceWithTarget = (target: number) => {
    let targetImage = '';

    if (target === 1) {
      targetImage = '/cherry1.png';
    } else if (target === 2) {
      targetImage = '/cherry2.png';
    } else if (target === 3) {
      targetImage = '/cherry3.png';
    }

    startSequence(targetImage);
  };

  const mutation = useMutation(
    async () => {
      const response = await instance.post('/diary/emotions?year=2023&month=1');
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        let target = 0;

        if (data.emotion === "행복") {
          target = 3;
        } else if (data.emotion === "중립") {
          target = 2;
        } else if (data.emotion === "분노") {
          target = 1;
        } else if (data.emotion === "불안") {
          target = 1;
        } else if (data.emotion === "혐오") {
          target = 1;
        } else if (data.emotion === "당황") {
          target = 1;
        } else if (data.emotion === "슬픔") {
          target = 1;
        }
  
        startSequenceWithTarget(target);
      },
      onError: (error: any) => {
        console.log('실패', error);
      },
    },
  );

  useEffect(() => {
    mutation.mutate();
  }, []);

  useEffect(() => {
    if (nextImage) {
      startSequence(nextImage);
    }
  }, [nextImage]);

  return (
    <div>
      {currentImage && (
        <img
          src={currentImage}
          alt="current"
          className="image fadeOut"
          width={1300}
          height={200}
        />
      )}
      {nextImage && (
        <img
          src={nextImage}
          alt="next"
          className="image fadeIn"
          width={1300}
          height={200}
        />
      )}
    </div>
  );
};

export default Analysis;