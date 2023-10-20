import React, { FormEvent, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

const Anaysis: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [nextImage, setNextImage] = useState<string | null>(null);

  // 애니메이션 효과 함수
  const startSequence = (targetImage: string) => {
    let transitionSequence: string[] = [];

    if (targetImage === "/cherry1.png") {
      transitionSequence = ["/cherry3.png", "/cherry1.png"];
    } else if (targetImage === "/cherry2.png") {
      transitionSequence = ["/cherry3.png", "/cherry2.png"];
    } else if (targetImage === "/cherry3.png") {
      transitionSequence = ["/cherry1.png", "/cherry3.png"];
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

  // 통신 결과에 따라 targetImage를 설정하는 함수
  const startSequenceWithTarget = (target: number) => {
    let targetImage = "";

    if (target === 1) {
      targetImage = "/cherry1.png";
    } else if (target === 2) {
      targetImage = "/cherry2.png";
    } else if (target === 3) {
      targetImage = "/cherry3.png";
    } 

    startSequence(targetImage);
  };

  useEffect(() => {
    startSequence("/cherry3.png");
  }, [nextImage]);

  // 통신 함수
  const mutation = useMutation(
    async () => {
      const response = await instance.post('http://localhost:5001/anaysis');
      return response.data;
    },
    {
      // 로그인 성공
      onSuccess: (data) => {
        console.log('성공', data);

        // data의 결과값으로 startSequenceWithTarget 함수를 호출
        startSequenceWithTarget(data.result);
      },
      // 로그인 실패
      onError: (error) => {
        console.log('실패', error);
      }
    }
  );

  return (
    <div>
      {currentImage && (
        <img src={currentImage} alt="current" className="image fadeOut" width={300} height={100} />
      )}
      {nextImage && (
        <img src={nextImage} alt="next" className="image fadeIn" width={300} height={100} />
      )}
    </div>
  );

};

export default Anaysis;
