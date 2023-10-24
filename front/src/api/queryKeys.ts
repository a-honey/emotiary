export const queryKeys = {
  /* DIARY */

  //** NETWORKPAGE 모든 다이어리 조회 */
  diarysData: ({
    select,
    page,
  }: {
    select: string | null;
    page: number | null;
  }) => {
    if (!select && !page) {
      return ['diarysData'];
    }
    return ['diarysData', select, page];
  },
  //** MAINPAGE 나의 캘린더별, USERIDPAGE 캘린더 다이어리 조회 */
  myDiaryData: ({ year, month }: { year: number; month: number }) => [
    'myDiaryData',
    year,
    month,
  ],
  //** 마이페이지 모든  다이어리 조회 */
  myAllDiarysData: () => ['myAllDiarysData'],
  //** 다이어리 모달 id로 조회
  diaryData: ({ id }: { id: string }) => ['diaryData', id],

  /* FRIEND */

  //** 친구요청받은 목록 조회 */
  sentFriends: () => ['sentFriends'],
  //** 친구요청보낸 목록 조회 */
  receivedFriends: () => ['receivedFriends'],

  /* USER */

  usersData: ({ page }: { page: number }) => ['usersData', page],
  myUserData: () => ['myUserData'],
  userData: () => ['userData'],

  /* COMMENT */
  diaryCommentData: ({ id }: { id: string }) => ['diaryCommentData', id],
};
