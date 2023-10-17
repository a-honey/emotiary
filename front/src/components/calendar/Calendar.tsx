import React, { useState } from 'react';
import styles from './index.module.scss';
import Month from './Month';
import Day from './Day';
import { CalendarDiaryItemType } from '../../types/diaryType';

const Calendar = ({
  data,
  isFetching,
}: {
  data: CalendarDiaryItemType[];
  isFetching: boolean;
}) => {
  const today = new Date();
  // 초반 currentDate에 현재 날짜를 보관
  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const handleBeforeMonth = () => {
    // 이전 달로 상태 변경
    if (currentDate.month === 1) {
      setCurrentDate({
        year: currentDate.year - 1,
        month: 12, // 현재 1월일 경우 12월로 설정
      });
    } else {
      setCurrentDate({
        year: currentDate.year,
        month: currentDate.month - 1,
      });
    }
  };

  const handleNextMonth = () => {
    // 다음 달로 상태 변경
    if (currentDate.month === 12) {
      setCurrentDate({
        year: currentDate.year + 1,
        month: 1, // 현재 12월일 경우 1월로 설정
      });
    } else {
      setCurrentDate({
        year: currentDate.year,
        month: currentDate.month + 1,
      });
    }
  };

  return (
    <div className={styles.calendarBlock}>
      {/* 렌더링 Month 상태를 변경하는 컴포넌트*/}
      <Month
        currentDate={currentDate}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
      />
      {/* props에 따른 날짜 매핑 컴포넌트*/}
      <Day currentDate={currentDate} data={data} />
    </div>
  );
};

export default Calendar;
