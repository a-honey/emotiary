import React from 'react';

import styles from '../styles/Network.Tab.module.scss';

const TAPLIST = [
  'all',
  'sadness',
  'surprise',
  'happiness',
  'aversion',
  'unrest',
  'anger',
  'neutality',
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
          className={tapEmotion === emotion ? styles.active : ''}
          onClick={() => {
            handleTapEmotion(emotion);
          }}
        >
          {emotion.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Tab;
