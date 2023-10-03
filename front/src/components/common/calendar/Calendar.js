import styles from './index.module.scss';
import { useState } from 'react';
import Month from './Month';
import Day from './Day';

const fakeCalendarData = [
  { diary_id: 1, dateCreated: '23-10-1', emoji: ':smile:' },
  { diary_id: 1, dateCreated: '23-10-3', emoji: ':angry:' },
];

const Calendar = () => {
  const currentDate = new Date();
  // 현재 날짜의 Month를 currentMonth를 통해 상태 관리
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);

  const handleBeforeMonth = () => {
    // 이전 달 달력으로 상태변경
    setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    // 다음 달 달력으로 상태변경
    setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className={styles.calendarBlock}>
      {/* 렌더링 Month 상태를 변경하는 컴포넌트*/}
      <Month
        currentMonth={currentMonth}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
      />
      {/* props에 따른 날짜 매핑 컴포넌트*/}
      <Day currentMonth={currentMonth} data={fakeCalendarData} />
    </div>
  );
};

export default Calendar;
