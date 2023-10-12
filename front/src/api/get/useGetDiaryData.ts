import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';

//** NETWORKPAGE 모든 다이어리 조회 */
export const useGetDiarysData = (
  user_id: string,
  select: string,
  page: number,
  limit: number,
) => {
  return useQuery({
    queryKey: ['diarysData'],
    queryFn: async () => {
      const response = await instance.get(
        `/diary/views/users/${user_id}?select=${select}&page=${page}&limit=${limit}`,
      );
      return response.data;
    },
  });
};

//** MAINPAGE 나의 캘린더별, USERIDPAGE 캘린더 다이어리 조회 */
export const useGetMyDiaryData = (
  user_id: string,
  year: number,
  month: number,
) => {
  return useQuery(['myDiaryData'], async () => {
    const response = await instance.get(
      `/diary/views/date/${user_id}?year=${year}month=${month}`,
    );
    return response.data;
  });
};

//** 마이페이지 모든  다이어리 조회 */
export const useGetMyAllDiarysData = (page: number, limit: number) => {
  return useQuery(['myAllDiarysData'], async () => {
    const response = await instance.get(
      `/diary/views?page=${page}&limit${limit}`,
    );
    return response.data;
  });
};

//** 다이어리 모달 id로 조회 ['diaryData', id] */
export const useGetDiaryData = (id: string) => {
  return useQuery(['diaryData', id], async () => {
    const response = await instance.get(`/diary/${id}`);
    return response.data;
  });
};
