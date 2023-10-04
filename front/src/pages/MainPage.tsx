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
    <main style={{ gap: '20px' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ backgroundColor: 'white' }}>박스1</div>
        <div style={{ backgroundColor: 'white' }}>박스2</div>
      </div>
      <Calendar handleIsDiaryWriting={handleIsDiaryWriting} />
      {isDiaryWriting && (
        <DiaryWriting handleIsDiaryWriting={handleIsDiaryWriting} />
      )}
    </main>
  );
};

export default MainPage;
