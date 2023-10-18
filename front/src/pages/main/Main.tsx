import React from 'react';
import { useState } from 'react';
import DiaryWriting from './components/Main.DiaryWriting';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import Calendar from '../../components/calendar/Calendar';
import { fakeDiaryData } from '../../mock/diary';

// Data 객체를 만들어서 해당 날짜 + 쿼리키 공통 캘린더 컴포넌트에 전달 필요
const MainPage: React.FC = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const { data: myDiaryData, isFetching } = useGetMyDiaryData({
    user_id: `${localStorage.getItem('userId')}`,
    year: currentDate.year,
    month: currentDate.month,
  });

  return (
    <main
      style={{
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '20px',
        }}
      >
        <div style={{ backgroundColor: 'white' }}>최신글</div>
        <div style={{ backgroundColor: 'white' }}>통계이미지</div>
        <div style={{ backgroundColor: 'white' }}>명언및노래</div>
      </div>
      <Calendar
        data={isFetching ? [] : myDiaryData}
        isFetching={isFetching}
        isLogin={true}
      />
    </main>
  );
};

export default MainPage;
