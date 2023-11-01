import React, { useEffect } from 'react';
import UserCard from './components/UserId.UserCard';
import Calendar from '../../components/calendar/Calendar';
import { useGetMyDiaryData } from '../../api/get/useGetDiaryData';
import { useLocation, useNavigate } from 'react-router-dom';
import useCalendar from '../../hooks/useCalendar';
import withLogin from '../../components/withLogin';

const UserIdPage: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();

  const { currentDate, handleBeforeMonth, handleNextMonth, handleCurrentDate } =
    useCalendar();

  const { data: diaryData, isFetching } = useGetMyDiaryData({
    user_id: `${location.pathname.split('/')[2]}`,
    year: currentDate.year,
    month: currentDate.month,
  });

  useEffect(() => {
    if (location.pathname.split('/')[2] === localStorage.getItem('userId')) {
      navigator('/mypage');
    }
  }, [navigator, location]);

  return (
    <main style={{ height: '95vh' }}>
      <UserCard />
      <Calendar
        handleCurrentDate={handleCurrentDate}
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
