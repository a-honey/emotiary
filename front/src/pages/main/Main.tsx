import React, { useEffect, useState } from 'react';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import Calendar from '../../components/calendar/Calendar';
import useCalendar from '../../hooks/useCalendar';
import withLogin from '../../components/withLogin';
import Analysis from './components/Main.Analysis';

// Data 객체를 만들어서 해당 날짜 + 쿼리키 공통 캘린더 컴포넌트에 전달 필요
const MainPage: React.FC = () => {
  const { currentDate, handleBeforeMonth, handleNextMonth, handleCurrentDate } =
    useCalendar();

  const { data: myDiaryData, isFetching } = useGetMyDiaryData({
    user_id: localStorage.getItem('userId')!,
    year: currentDate.year,
    month: currentDate.month,
  });

  return (
    <main className="column">
      <Analysis year={currentDate.year} month={currentDate.month} />
      <Calendar
        handleCurrentDate={handleCurrentDate}
        currentDate={currentDate}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
        data={isFetching ? [] : myDiaryData}
        isFetching={isFetching}
        isLogin={true}
      />
    </main>
  );
};

export default withLogin(MainPage);
