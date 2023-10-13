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
    <main
      style={{
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '20px',
        }}
      >
        <div style={{ backgroundColor: 'white' }}>최신글</div>
        <div style={{ backgroundColor: 'white' }}>통계이미지</div>
        <div style={{ backgroundColor: 'white' }}>명언및노래</div>
      </div>
      <CalendarContainer handleIsOpenDiaryWriting={handleIsOpenDiaryWriting} />
      {isDiaryWriting && (
        <DiaryWriting handleIsOpenDiaryWriting={handleIsOpenDiaryWriting} />
      )}
    </main>
  );
};

export default MainPage;
