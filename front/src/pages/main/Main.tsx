import React from 'react';
import { useState } from 'react';
import DiaryWriting from './components/Main.DiaryWriting';
import CalendarContainer from './components/Main.CalendarContainer';

const MainPage: React.FC = () => {
  const [isDiaryWriting, setIsDiaryWriting] = useState(false);

  const handleIsOpenDiaryWriting = (boolean: boolean) => {
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
      <CalendarContainer handleIsOpenDiaryWriting={handleIsOpenDiaryWriting} />
      {isDiaryWriting && (
        <DiaryWriting handleIsOpenDiaryWriting={handleIsOpenDiaryWriting} />
      )}
    </main>
  );
};

export default MainPage;
