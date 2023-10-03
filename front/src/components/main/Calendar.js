import { useState } from 'react';
import Month from '../common/calendar/Month';
import Day from '../common/calendar/Day';
import { useQuery } from 'react-query';
import { fetchCalendar } from '@/api/fake';

const Calender = () => {
  // 현재 날짜 객체 생성
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

  const { data, isLoading, error } = useQuery('calendar', fetchCalendar);

  return (
    <div className="w-full bg-white">
      {/* 렌더링 Month 상태를 변경하는 컴포넌트*/}
      <Month
        currentMonth={currentMonth}
        handleBeforeMonth={handleBeforeMonth}
        handleNextMonth={handleNextMonth}
      />
      {/* props에 따른 날짜 매핑 컴포넌트*/}
      <Day currentMonth={currentMonth} data={data} />
    </div>
  );
};

export default Calender;
