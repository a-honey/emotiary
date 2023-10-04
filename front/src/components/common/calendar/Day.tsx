import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

const Day = ({
  currentDate,
  data,
  handleIsDiaryWriting,
}: {
  currentDate: { year: number; month: number };
  data: object;
  handleIsDiaryWriting: (arg: boolean) => void;
}) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 날짜를 기준으로 날짜를 담아서 매핑
  const [days, setDays] = useState<Date[]>([]);

  const today = new Date();

  useEffect(() => {
    const monthStart = startOfMonth(
      new Date(currentDate.year, currentDate.month, 0),
    ); // 현재 월의 시작일
    const monthEnd = endOfMonth(monthStart); // currentDate의 종료일
    const startDate = startOfWeek(monthStart); // currentDate의 맨 앞칸
    const endDate = endOfWeek(monthEnd); // currentDate의 마지막 칸

    let currentDatePointer = startDate;
    const newDays = [];

    while (currentDatePointer <= endDate) {
      newDays.push(currentDatePointer);
      currentDatePointer = addDays(currentDatePointer, 1);
    }

    setDays(newDays);
  }, [currentDate]);

  return (
    <div className={styles.dayContainer}>
      <div className={styles.weekBlock}>
        {week.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </div>
      <div className={styles.dayBlock}>
        {days.map((day: Date, index) => (
          <div
            key={index}
            className={
              day.getFullYear() === today.getFullYear() &&
              day.getMonth() === today.getMonth() &&
              day.getDate() === today.getDate()
                ? styles.today
                : ''
            }
          >
            {day.getDate()}
            <button
              className={styles.addBtn}
              onClick={() => {
                handleIsDiaryWriting(true);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
