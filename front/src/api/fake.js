export const fetchCalendar = async () => {
  const fakeCalendarData = [
    { diary_id: 1, dateCreated: '23-10-1', emoji: ':smile:' },
    { diary_id: 1, dateCreated: '23-10-3', emoji: ':angry:' },
  ];

  // 가짜 데이터를 반환
  return fakeCalendarData;
};
