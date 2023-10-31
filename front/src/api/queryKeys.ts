export const queryKeys = {
  /* DIARY */

  //** NETWORKPAGE 모든 다이어리 조회 */
  diarysData: ({
    emotion,
    select,
    page,
  }: {
    emotion: string | null;
    select: string | null;
    page: number | null;
  }) => {
    if (!select && !page && !emotion) {
      return ['diarysData'];
    }
    return ['diarysData', select, page, emotion];
  },

  //** MAINPAGE 나의 캘린더별, USERIDPAGE 캘린더 다이어리 조회 */
  calendarDiaryData: ({
    user_id,
    year,
    month,
  }: {
    user_id: string;
    year: number;
    month: number;
  }) => ['calendarDiaryData', user_id, year, month],
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

  usersData: ({ page, select }: { page: number; select: string }) => [
    'usersData',
    page,
    select,
  ],
  myUserData: () => ['myUserData'],
  userData: () => ['userData'],

  /* COMMENT */
  diaryCommentData: ({ id }: { id: string }) => ['diaryCommentData', id],

  /* SEARCH */
  searchUserData: ({
    searchTerm,
    field,
  }: {
    searchTerm: string;
    field: 'email' | 'username' | 'title' | 'content';
  }) => ['searchUserData', searchTerm, field],
};
