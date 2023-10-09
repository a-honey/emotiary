import { instance } from '../instance';
import { useQuery } from '@tanstack/react-query';

export const useGetUsersData = () => {
  return useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const response = await instance.get('/users/allUser');
      return response.data;
    },
  });
};

export const useGetMyUserData = () => {
  return useQuery({
    queryKey: ['myUserData'],
    queryFn: async () => {
      const response = await instance.get('/users/current');
      return response.data;
    },
  });
};
