import { instance } from '../instance';
import { queryKeys } from '../queryKeys';
import { useQuery } from '@tanstack/react-query';

//** NETWORKPAGE 모든 다이어리 조회 */
export const useGetDiarysData = ({
  select,
  emotion,
  page,
  limit,
}: {
  select: string;
  page: number;
  emotion: string;
  limit: number;
}) => {
  return useQuery(queryKeys.diarysData({ select, page, emotion }), () => {
    const urlQueryString = new URLSearchParams({
      select,
      page: page.toString(),
      limit: limit.toString(),
      emotion,
    }).toString();

    return instance
      .get(`/diary/views/users?${urlQueryString}`)
      .then((res) => res.data);
  });
};

//** MAINPAGE 나의 캘린더별, USERIDPAGE 캘린더 다이어리 조회 */
export const useGetMyDiaryData = ({
  user_id,
  year,
  month,
}: {
  user_id: string;
  year: number;
  month: number;
}) => {
  return useQuery(
    queryKeys.myDiaryData({ year, month }),
    () => {
      const urlQueryString = new URLSearchParams({
        year: year.toString(),
        month: month.toString(),
      }).toString();

      const response: any = instance.get(
        `/diary/views/date/${user_id}?${urlQueryString}`,
      );
      return response.data;
    },
    { select: (data) => data.data },
  );
};

//** 마이페이지 모든  다이어리 조회 */
export const useGetMyAllDiarysData = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery(queryKeys.myAllDiarysData(), () => {
    const urlQueryString = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return instance
      .get(`/diary/views?${urlQueryString}`)
      .then((res) => res.data);
  });
};

//** 다이어리 모달 id로 조회 ['diaryData', id] */
export const useGetDiaryData = ({ id }: { id: string }) => {
  return useQuery(queryKeys.diaryData({ id }), () => {
    return instance.get(`/diary/${id}`).then((res) => res.data.data);
  });
};
