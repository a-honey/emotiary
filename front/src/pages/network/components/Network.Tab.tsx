import React from 'react';

import styles from '../styles/Network.Tab.module.scss';

export interface TapType {
  resource:
    | 'all'
    | 'sadness'
    | 'surprise'
    | 'happiness'
    | 'aversion'
    | 'unrest'
    | 'anger'
    | 'neutrality';
}

const TAPLIST: TapType['resource'][] = [
  'all',
  'sadness',
  'surprise',
  'happiness',
  'aversion',
  'unrest',
  'anger',
  'neutrality',
];

const Tab = ({
  handleTapEmotion,
  tapEmotion,
}: {
  handleTapEmotion: (args: TapType['resource']) => void;
  tapEmotion: TapType['resource'];
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
