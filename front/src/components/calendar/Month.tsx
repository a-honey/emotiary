import React from 'react';
import styles from './index.module.scss';

const Month = ({
  currentDate,
  handleNextMonth,
  handleBeforeMonth,
}: {
  currentDate: { year: number; month: number };
  handleNextMonth: () => void;
  handleBeforeMonth: () => void;
}) => {
  return (
    <div className={styles.monthBlock}>
      <button onClick={handleBeforeMonth}>{'<'}</button>
      <div>
        <span>{currentDate.year}</span>
        <div>{currentDate.month}</div>
      </div>
      <button onClick={handleNextMonth}>{'>'}</button>
    </div>
  );
};

export default Month;
