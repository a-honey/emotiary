import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { CalendarDiaryItemType } from '../../types/diaryType';

// 메인페이지 UI 미확정으로 배치만 해둠 추후 변경 예정
const Day = ({
  currentDate,
  data,
  handleIsOpenDiaryWriting,
}: {
  currentDate: { year: number; month: number };
  data: CalendarDiaryItemType[];
  handleIsOpenDiaryWriting?: (arg: boolean) => void;
}) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 날짜를 기준으로 날짜를 담아서 매핑
  const [days, setDays] = useState<Date[]>([]);

  const today = new Date();

  useEffect(() => {
    const monthStart = startOfMonth(
      new Date(currentDate.year, currentDate.month, 0),
    ); // 현재 월의 시작일
    const monthEnd = endOfMonth(monthStart); // currentDate의 종료일
    const startDate = startOfWeek(monthStart); // currentDate의 맨 앞칸
    const endDate = endOfWeek(monthEnd); // currentDate의 마지막 칸

    let currentDatePointer = startDate;
    const newDays = [];

    while (currentDatePointer <= endDate) {
      newDays.push(currentDatePointer);
      currentDatePointer = addDays(currentDatePointer, 1);
    }

    setDays(newDays);
  }, [currentDate]);

  return (
    <div className={styles.dayContainer}>
      <div className={styles.weekBlock}>
        {week.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </div>
      <div className={styles.dayBlock}>
        {days.map((day: Date, index) => (
          <div
            key={index}
            className={
              day.getFullYear() === today.getFullYear() &&
              day.getMonth() === today.getMonth() &&
              day.getDate() === today.getDate()
                ? `${styles.dayItem} ${styles.today}`
                : styles.dayItem
            }
          >
            <div
              className={
                day.getFullYear() === currentDate.year &&
                day.getMonth() + 1 === currentDate.month
                  ? styles.day
                  : `${styles.day} ${styles.otherMonth}`
              }
            >
              {day.getDate()}
            </div>
            {/* 현재 년월이 같고, 오늘보다 과거이면 내용 추가 */}
            {day.getFullYear() === currentDate.year &&
              day.getMonth() + 1 === currentDate.month &&
              day.getDate() <= today.getDate() && (
                <DayItem
                  day={day.getDate()}
                  data={data}
                  handleIsOpenDiaryWriting={handleIsOpenDiaryWriting}
                />
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;

const DayItem = ({
  day,
  data,
  handleIsOpenDiaryWriting,
}: {
  day: number;
  data: CalendarDiaryItemType[];
  handleIsOpenDiaryWriting?: (arg: boolean) => void;
}) => {
  // day.getDate()와 일치하는 데이터를 찾아서 반환
  // 날짜 전체로 비교, 오늘보다 큰 값들은 버튼 제거 예정
  // 매번 데이터를 돌아야 하는가? 생각
  const filteredData = data.filter(
    (item) => day === item.dateCreated.getDate(),
  );

  if (filteredData.length > 0) {
    const data = filteredData[0];
    return (
      <>
        <div className={styles.emoji} onClick={() => {}}>
          {data.emoji}
        </div>
      </>
    );
  } else {
    // 데이터가 없으면 게시글 작성 버튼
    return (
      <>
        {handleIsOpenDiaryWriting && (
          <button
            className={styles.addBtn}
            onClick={() => {
              handleIsOpenDiaryWriting(true);
            }}
          >
            +
          </button>
        )}
      </>
    );
  }
};
