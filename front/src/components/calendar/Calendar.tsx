import React from 'react';
import styles from './index.module.scss';
import Month from './Month';
import Day from './Day';

import { DiaryItemType } from '../../api/get/useGetDiaryData.types';

const Calendar = ({
  data,
  isFetching,
  isLogin,
  currentDate,
  handleNextMonth,
  handleBeforeMonth,
  handleCurrentDate,
}: {
  handleCurrentDate: ({ year, month }: { year: number; month: number }) => void;
  currentDate: { year: number; month: number };
  handleNextMonth: () => void;
  handleBeforeMonth: () => void;
  data?: DiaryItemType[];
  isFetching: boolean;
  isLogin: boolean;
}) => {
  return (
    <div className={styles.calendarBlock}>
      {/* 렌더링 Month 상태를 변경하는 컴포넌트*/}
      <Month
        handleCurrentDate={handleCurrentDate}
        currentDate={currentDate}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
      />
      {/* props에 따른 날짜 매핑 컴포넌트*/}
      <Day currentDate={currentDate} data={data} isLogin={isLogin} />
    </div>
  );
};

export default Calendar;
