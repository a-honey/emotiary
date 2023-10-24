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
import DiaryItemShow from '../diary/DiaryItemShow';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import DiaryWriting from '../../pages/main/components/Main.DiaryWriting';

const isTodayDayTile = ({ day }: { day: Date }) => {
  const today = new Date();
  return (
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate()
  );
};

// 메인페이지 UI 미확정으로 배치만 해둠 추후 변경 예정
const Day = ({
  currentDate,
  data,
  isLogin,
}: {
  currentDate: { year: number; month: number };
  data: CalendarDiaryItemType[];
  isLogin: boolean;
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

  const handleOnDragEnd = () => {
    return;
  };

  return (
    <div className={styles.dayContainer}>
      <div className={styles.weekBlock}>
        {week.map((el) => (
          <div key={el}>{el}</div>
        ))}
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="days">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.dayBlock}
            >
              {days.map((day: Date, index) => (
                <div ref={provided.innerRef} className={styles.dayItem}>
                  {/* 돌리는 날짜가 오늘 년도, 월, 일과 같으면 오늘날의 스타일 */}
                  <div
                    className={isTodayDayTile({ day }) ? `${styles.today}` : ''}
                  >
                    {/* 돌리는 날짜가 월이 다르면 회색 스타일 */}
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
                      day <= today && (
                        <DayItem
                          day={day}
                          data={data}
                          index={index}
                          isLogin={isLogin}
                        />
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Day;

const DayItem = ({
  day,
  data,
  index,
  isLogin,
}: {
  day: Date;
  data: CalendarDiaryItemType[];
  index: number;
  isLogin: boolean;
}) => {
  const [isOpenDiary, setIsOpenDiary] = useState(false);

  const toggleIsOpenModal = () => {
    setIsOpenDiary((prev) => !prev);
  };

  if (isLogin) {
    // 데이터가 없으면 게시글 작성 버튼
    return (
      <>
        {
          <button className={styles.addBtn} onClick={toggleIsOpenModal}>
            +
          </button>
        }
        {isOpenDiary && (
          <DiaryWriting
            handleIsOpenDiaryWriting={toggleIsOpenModal}
            day={day}
          />
        )}
      </>
    );
  }

  const filteredData = data?.filter(
    (item) =>
      day.getDate().toString() === item?.createdDate.split('T')[0].slice(-2),
  );

  if (filteredData?.length > 0) {
    const data = filteredData[0];
    return (
      <Draggable draggableId={day.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={snapshot.isDragging ? styles.dayItemDragging : ''}
          >
            <div className={styles.emoji} onClick={toggleIsOpenModal}>
              {data.emoji}
            </div>
            {isOpenDiary && (
              <DiaryItemShow
                toggleIsOpenModal={toggleIsOpenModal}
                id={data.id}
              />
            )}
          </div>
        )}
      </Draggable>
    );
  }
};
