import React from 'react';
import UserCard from '../components/userId/UserCard';
import CalendarContainer from '../components/main/CalendarContainer';

const UserIdPage: React.FC = () => {
  return (
    <main style={{ gap: '40px' }}>
      <UserCard />
      {/* api 어떻게 갈지 몰라서 일단 메인페이지 캘린더가져옴 */}
      <CalendarContainer />
    </main>
  );
};

export default UserIdPage;
