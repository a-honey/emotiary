import React from 'react';
import DiaryList from './components/Network.DiaryList';
import withLogin from '../../components/withLogin';

const NetworkPage: React.FC = () => {
  return (
    <main>
      <DiaryList />
    </main>
  );
};

export default withLogin(NetworkPage);
