import React from 'react';

import MyCard from '../components/my/MyCard';
import DiaryList from '../components/my/DiaryList';

const MyPage: React.FC = () => {
  return (
    <main style={{ gap: '40px' }}>
      <MyCard />
      <DiaryList />
    </main>
  );
};

export default MyPage;
