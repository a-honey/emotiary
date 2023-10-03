import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';

const Day = ({ currentMonth }) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const monthStart = startOfMonth(currentMonth); // 현재 월의 시작일
  const monthEnd = endOfMonth(monthStart); // 현재 월의 종료일
  const startDate = startOfWeek(monthStart); // 현재 달력의 맨 앞칸
  const endDate = endOfWeek(monthEnd); // 현재 달력의 마지막 칸

  return (
    <div className="grid grid-rows-5 grid-cols-7 gap-4">
      {week.map((el) => (
        <div key={el}>{el}</div>
      ))}

      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  );
};

export default Day;
