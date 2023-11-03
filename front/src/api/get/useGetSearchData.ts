import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { instance } from '../instance';
import { SearchDiaryType, SearchUserType } from './useGetSearchData.types';
import { PaginationType } from '../types';

export const useGetSearchUserData = ({
  searchTerm,
  field,
}: {
  searchTerm: string;
  field: 'email' | 'username' | 'title' | 'content';
}) => {
  return useQuery(queryKeys.searchUserData({ searchTerm, field }), () => {
    const urlQueryString = new URLSearchParams({
      searchTerm,
      field,
    }).toString();
    return instance
      .get<{ data: SearchUserType[] & PaginationType }>(
        `/users/search?${urlQueryString}`,
      )
      .then((res) => res.data);
  });
};

export const useGetSearchDiaryData = ({ search }: { search: string }) => {
  return useQuery(['searchData', search], () => {
    return instance
      .get<{ data: SearchDiaryType[] & PaginationType }>(
        `/diary/search?search=${search}`,
      )
      .then((res) => res.data);
  });
};
