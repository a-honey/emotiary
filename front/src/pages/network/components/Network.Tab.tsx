import React from 'react';

import styles from '../styles/Network.Tab.module.scss';

const TAPLIST = [
  { en: 'all', ko: '전체' },
  { en: 'sadness', ko: '슬픔' },
  { en: 'surprise', ko: '당황' },
  { en: 'happiness', ko: '행복' },
  { en: 'aversion', ko: '혐오' },
  { en: 'unrest', ko: '불안' },
  { en: 'anger', ko: '분노' },
  { en: 'neutrality', ko: '중립' },
];

const Tab = ({
  handleTapEmotion,
  tapEmotion,
}: {
  handleTapEmotion: (args: string) => void;
  tapEmotion: string;
}) => {
  return (
    <div className={styles.tabContainer}>
      {TAPLIST.map((emotion, index) => (
        <div
          key={index}
          className={tapEmotion === emotion.ko ? styles.active : ''}
          onClick={() => {
            handleTapEmotion(emotion.ko);
          }}
        >
          {emotion.en.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Tab;
