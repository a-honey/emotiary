import React, { useState } from 'react';
import UserCard from './components/UserId.UserCard';
import Calendar from '../../components/calendar/Calendar';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import { fakeDiaryData } from '../../mock/diary';
import { useLocation } from 'react-router-dom';

const UserIdPage: React.FC = () => {
  const today = new Date();
  const location = useLocation();

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

  const { data: diaryData, isFetching } = useGetMyDiaryData({
    user_id: `${location.pathname.split('/')[2]}`,
    year: currentDate.year,
    month: currentDate.month,
  });

  return (
    <main style={{ gap: '40px' }}>
      <UserCard />
      <Calendar
        currentDate={currentDate}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
        data={isFetching ? [] : diaryData}
        isFetching={isFetching}
        isLogin={false}
      />
    </main>
  );
};

export default UserIdPage;
