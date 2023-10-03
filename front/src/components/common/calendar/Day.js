import { useState } from 'react';
import styles from './index.module.scss';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

const Day = ({ currentMonth, data }) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const monthStart = startOfMonth(currentMonth); // 현재 월의 시작일
  const monthEnd = endOfMonth(monthStart); // 현재 월의 종료일
  const startDate = startOfWeek(monthStart); // 현재 달력의 맨 앞칸
  const endDate = endOfWeek(monthEnd); // 현재 달력의 마지막 칸

  // 현재 날짜를 기준으로 날짜를 담아서 매핑
  const days = [];
  let currentDatePointer = startDate;

  while (currentDatePointer <= endDate) {
    days.push(currentDatePointer);
    currentDatePointer = addDays(currentDatePointer, 1);
  }

  return (
    <div className={styles.dayBlock}>
      {week.map((el) => (
        <div key={el}>{el}</div>
      ))}
      {days.map((day, index) => (
        <div key={index}>{day.getDate()}</div>
      ))}
    </div>
  );
};

export default Day;
