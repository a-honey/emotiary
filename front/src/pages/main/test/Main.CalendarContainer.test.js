import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGetMyDiaryData } from '../../../api/get/useGetDiaryData';
import CalendarContainer from '../components/Main.CalendarContainer';

jest.mock('../../../api/get/useGetDiaryData');

test('useGetMyDiaryData에서 받아온 data 테스트', () => {
  const mockData = {
    is_public: true,
    content: {
      title: 'Test Title',
    },
  };

  const fakeData = { data: mockData };

  useGetMyDiaryData.mockReturnValue({
    data: fakeData,
    isFetching: false,
  });

  render(<CalendarContainer />);

  const isPublicElement = screen.getByText(`is_public: ${mockData.is_public}`);
  const titleElement = screen.getByText(`Title: ${mockData.content.title}`);

  expect(isPublicElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();
});
