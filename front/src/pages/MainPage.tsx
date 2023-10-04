import React from 'react';
import { useState } from 'react';
import Calendar from '../components/common/calendar/Calendar';
import DiaryWriting from '../components/main/DiaryWriting';

const MainPage: React.FC = () => {
  const [isDiaryWriting, setIsDiaryWriting] = useState(false);

  const handleIsDiaryWriting = (boolean: boolean) => {
    setIsDiaryWriting(boolean);
  };

  return (
    <main>
      <Calendar handleIsDiaryWriting={handleIsDiaryWriting} />
      {isDiaryWriting && (
        <DiaryWriting handleIsDiaryWriting={handleIsDiaryWriting} />
      )}
    </main>
  );
};

export default MainPage;
