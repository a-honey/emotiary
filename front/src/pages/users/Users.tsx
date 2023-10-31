import React from 'react';
import UserList from './components/Users.UserList';
import withLogin from '../../components/withLogin';
const UsersPage: React.FC = () => {
  return (
    <main style={{ height: '95vh' }}>
      <UserList />
    </main>
  );
};

export default withLogin(UsersPage);
