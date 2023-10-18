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

  const { data: diaryData, isFetching } = useGetMyDiaryData({
    user_id: `${location.pathname.split('/')[2]}`,
    year: currentDate.year,
    month: currentDate.month,
  });

  return (
    <main style={{ gap: '40px' }}>
      <UserCard />
      <Calendar
        data={isFetching ? [] : diaryData}
        isFetching={isFetching}
        isLogin={false}
      />
    </main>
  );
};

export default UserIdPage;
