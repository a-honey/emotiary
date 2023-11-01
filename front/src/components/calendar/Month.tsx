import React from 'react';
import styles from './index.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Month = ({
  currentDate,
  handleNextMonth,
  handleBeforeMonth,
  handleCurrentDate,
}: {
  handleCurrentDate: ({ year, month }: { year: number; month: number }) => void;
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
      <div className={styles.dateWrapper}>
        <DatePicker
          selected={new Date(currentDate.year, currentDate.month - 1, 1)}
          onChange={(date) => {
            if (!date) {
              alert('date를 선택해주세요.');
              return;
            }
            const newYear = date.getFullYear();
            const newMonth = date.getMonth() + 1;
            handleCurrentDate({ year: newYear, month: newMonth });
          }}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          showFullMonthYearPicker
          className={styles.customDatePicker}
        />
      </div>
      <button onClick={handleNextMonth}>{'>'}</button>
    </div>
  );
};

export default Month;
