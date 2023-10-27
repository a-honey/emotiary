import React from 'react';
import DiaryList from './components/Network.DiaryList';
import withLogin from '../../components/withLogin';

const NetworkPage: React.FC = () => {
  return (
    <main style={{ height: '95vh' }}>
      <DiaryList />
    </main>
  );
};

export default withLogin(NetworkPage);
