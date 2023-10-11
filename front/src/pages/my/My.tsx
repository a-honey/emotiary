import React from 'react';

import MyCard from './components/My.MyCard';
import DiaryList from './components/My.DiaryList';

const MyPage: React.FC = () => {
  return (
    <main style={{ gap: '40px' }}>
      <MyCard />
      <DiaryList />
    </main>
  );
};

export default MyPage;
