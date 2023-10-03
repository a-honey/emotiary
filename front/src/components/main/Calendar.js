import { useState } from 'react';
import Month from '../common/calendar/Month';
import Day from '../common/calendar/Day';

const { default: Week } = require('../common/calendar/Week');

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(5);

  const handleBeforeMonth = () => {
    // 이전 달 달력으로 상태변경
    setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    // 다음 달 달력으로 상태변경
    setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className="w-full bg-white">
      {/* 렌더링 Month 상태를 변경하는 컴포넌트*/}
      <Month
        currentMonth={currentMonth}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
      />
      {/* 요일 매핑 컴포넌트*/}
      <Week />
      {/* props에 따른 날짜 매핑 컴포넌트*/}
      <Day />
    </div>
  );
};

export default Calender;
