import React, { useState, useEffect, useCallback } from 'react';
import cherry1 from '../assets/cherry1.png'
import cherry2 from '../assets/cherry2.png'
import cherry3 from '../assets/cherry3.png'
import { useMutation } from '@tanstack/react-query';
import { instance } from '../../../api/instance';

interface AnalysisProps {
  year: number;
  month: number;
}

const Analysis: React.FC<AnalysisProps> = ({ year, month }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);

  const startSequence = useCallback((targetImage: string) => {
    let transitionSequence: string[] = [];

    if (targetImage === cherry1) {
      transitionSequence = [cherry3, cherry1];
    } else if (targetImage === cherry2) {
      transitionSequence = [cherry3, cherry2];
    } else if (targetImage === cherry3) {
      transitionSequence = [cherry1, cherry3];
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
  }, [nextImage]);

  const startSequenceWithTarget = (target: number) => {
    let targetImage = '';

    if (target === 1) {
      targetImage = cherry1;
    } else if (target === 2) {
      targetImage = cherry2;
    } else if (target === 3) {
      targetImage = cherry3;
    }

    startSequence(targetImage);
  };

  const mutation = useMutation(
    async () => {
      const response = await instance.get(`/diary/emotions?year=${year}&month=${month}`);
      console.log(response.data)
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        let target = 0;
        // if (data.emotion === "행복") {
        //   target = 3;
        // } else if (data.emotion === "중립") {
        //   target = 2;
        // } else if (data.emotion === "분노") {
        //   target = 1;
        // } else if (data.emotion === "불안") {
        //   target = 1;
        // } else if (data.emotion === "혐오") {
        //   target = 1;
        // } else if (data.emotion === "당황") {
        //   target = 1;
        // } else if (data.emotion === "슬픔") {
        //   target = 1;
        // }
        target = 3;
  
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
  }, [nextImage, startSequence]);

  return (
    <div>
      {currentImage && (
        <img
          src={currentImage}
          alt="current"
          className="image fadeOut"
          style={{ width: '1300px', height: '200px', zIndex: 2 }}
        />
      )}
      {nextImage && (
        <img
          src={nextImage}
          alt="next"
          className="image fadeIn"
          style={{ width: '1300px', height: '200px', zIndex: 1 }}
        />
      )}
    </div>
  );
};

export default Analysis;
