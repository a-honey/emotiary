import React from 'react';
import UserCard from '../components/userId/UserCard';
import Calendar from '../components/common/calendar/Calendar';

const UserIdPage: React.FC = () => {
  return (
    <main style={{ gap: '40px' }}>
      <UserCard />
    </main>
  );
};

export default UserIdPage;
