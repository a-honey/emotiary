import React from 'react';

import MyCard from './components/My.MyCard';
import DiaryList from './components/My.DiaryList';
import withLogin from '../../components/withLogin';

const MyPage: React.FC = () => {
  return (
    <main>
      <MyCard />
      <DiaryList />
    </main>
  );
};

export default withLogin(MyPage);
