import React from 'react';
import UserList from './components/Users.UserList';
const UsersPage: React.FC = () => {
  return (
    <main style={{ height: '95vh' }}>
      <UserList />
    </main>
  );
};

export default UsersPage;
