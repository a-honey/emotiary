import { useState } from 'react';
import Calendar from '../components/common/calendar/Calendar';
import DiaryWriting from '../components/main/DiaryWriting';

const MainPage = () => {
  const [isDiaryWriting, setIsDiaryWriting] = useState(false);

  const handleIsDiaryWriting = (boolean) => {
    setIsDiaryWriting(boolean);
  };

  return (
    <main>
      <Calendar />
      <DiaryWriting handleIsDiaryWriting={handleIsDiaryWriting} />
    </main>
  );
};

export default MainPage;
