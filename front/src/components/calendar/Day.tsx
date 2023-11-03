import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import DiaryItemShow from '../diary/DiaryItemShow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DiaryWriting from '../../pages/main/components/Main.DiaryWriting';
import { DiaryItemType } from '../../api/get/useGetDiaryData.types';

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
  data?: DiaryItemType[];
  isLogin: boolean;
}) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  // 현재 날짜를 기준으로 날짜를 담아서 매핑
  const [days, setDays] = useState<Date[]>([]);
  // 드래그 종료 시점의 날짜를 담음
  const [draggedDate, setDraggedDate] = useState<any>(null);
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

  const handleOnDragEnd = (result: any) => {
    //alert('준비중인 기능입니다.');
    //return;
    console.log('드래그 종료됨');
    if (!result.destination) {
      console.log('잘못된 영역');
      return;
    }

    const draggedIndex = result.source.index;
    const droppedIndex = result.destination.index;

    const date = days[draggedIndex];
    console.log(draggedDate);
    console.log(droppedIndex);
    setDraggedDate(date);
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
          {(provided, snapshot) => (
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
                    {data &&
                      day.getFullYear() === currentDate.year &&
                      day.getMonth() + 1 === currentDate.month &&
                      day <= today && (
                        <>
                          <DayItem
                            day={day}
                            data={data}
                            index={index}
                            isLogin={isLogin}
                          />
                          {provided.placeholder}
                        </>
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

// 데이터가 있는 경우 데이터를 보여줌
// 로그인이 없는 경우 아무것도 반환하지 않음
// 로그인인 경우 + 반환
const DayItem = ({
  day,
  data,
  index,
  isLogin,
}: {
  day: Date;
  data: DiaryItemType[];
  index: number;
  isLogin: boolean;
}) => {
  const [isOpenDiary, setIsOpenDiary] = useState(false);

  const toggleIsOpenModal = () => {
    setIsOpenDiary((prev) => !prev);
  };

  const filteredData = data?.filter((item) => {
    const diaryDate = new Date(item?.createdDate);
    return (
      day.getFullYear() === diaryDate.getFullYear() &&
      day.getMonth() === diaryDate.getMonth() &&
      day.getDate() === diaryDate.getDate()
    );
  });

  if (filteredData?.length > 0) {
    const data = filteredData[0];
    return (
      <Draggable
        key={day.toString()}
        draggableId={day.toString()}
        index={index}
      >
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
  } else {
    // 데이터가 없으면 게시글 작성 버튼
    if (!isLogin) {
      return null;
    }
    return (
      <>
        {
          <button className={styles.addBtn} onClick={toggleIsOpenModal}>
            +
          </button>
        }
        {isOpenDiary && (
          <DiaryWriting toggleIsOpenModal={toggleIsOpenModal} day={day} />
        )}
      </>
    );
  }
};
