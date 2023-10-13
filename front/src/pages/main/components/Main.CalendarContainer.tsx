import React from 'react';

import Calendar from '../../../components/calendar/Calendar';

// 메인페이지, 유저별페이지에서 캘린더 컴포넌트 공통사용을 위해 데이터를 불러와서 전달만 하는 컴포넌트
// 페이지에서 해도됨, 컨테이너 굳이? 근데 페이지는 레이아웃 구분이 잘 되었으면 해서 api 요청 안하고 싶음 나중에 생각
// api 요청에 따라 그냥 user_id만 페이지에서 바로 공통 컴포넌트에 넘겨줘도될듯
const CalendarContainer = ({
  handleIsOpenDiaryWriting,
}: {
  handleIsOpenDiaryWriting?: (arg: boolean) => void;
}) => {
  // delete하면, data 상태 바꿔야함, api 요청할때는 setData에 담기 => react-query가 해결가능한부분인가? 나중에 생각
  const fakeData = [
    {
      diary_id: 1,
      dateCreated: new Date('2023-10-01T12:00:00Z'),
      emoji: '😀',
    },
    {
      diary_id: 2,
      dateCreated: new Date('2023-10-02T15:30:00Z'),
      emoji: '😊',
    },
    {
      diary_id: 3,
      dateCreated: new Date('2023-10-03T08:45:00Z'),
      emoji: '📖',
    },
    {
      diary_id: 4,
      dateCreated: new Date('2023-10-04T12:00:00Z'),
      emoji: '😀',
    },
    {
      diary_id: 5,
      dateCreated: new Date('2023-10-05T15:30:00Z'),
      emoji: '😊',
    },
    {
      diary_id: 6,
      dateCreated: new Date('2023-10-06T08:45:00Z'),
      emoji: '📖',
    },
  ];

  return (
    <Calendar
      data={fakeData}
      handleIsOpenDiaryWriting={handleIsOpenDiaryWriting}
    />
  );
};

export default CalendarContainer;
