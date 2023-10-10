import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';

//** NETWORKPAGE 모든 다이어리 조회 */
export const useGetDiarysData = ({
  user_id,
  select,
  page,
  limit,
}: {
  user_id: number;
  select: string;
  page: number;
  limit: number;
}) => {
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

//** MYPAGE 나의 캘린더별 다이어리 조회 */
export const useGetMyDiaryData = ({ month }: { month: number }) => {
  return useQuery({
    queryKey: ['myDiaryData'],
    queryFn: async () => {
      const response = await instance.get(`/diary/views/date?month=${month}`);
      return response.data;
    },
  });
};
