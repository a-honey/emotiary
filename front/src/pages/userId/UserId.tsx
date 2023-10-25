import React from 'react';
import UserCard from './components/UserId.UserCard';
import Calendar from '../../components/calendar/Calendar';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import { useLocation } from 'react-router-dom';
import useCalendar from '../../hooks/useCalendar';
import withLogin from '../../components/withLogin';

const UserIdPage: React.FC = () => {
  const location = useLocation();

  const { currentDate, handleBeforeMonth, handleNextMonth } = useCalendar();

  const { data: diaryData, isFetching } = useGetMyDiaryData({
    user_id: `${location.pathname.split('/')[2]}`,
    year: currentDate.year,
    month: currentDate.month,
  });

  return (
    <main style={{ gap: '40px', height: '93vh' }}>
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

export default withLogin(UserIdPage);
