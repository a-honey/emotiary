import React, { useState } from 'react';

const useCalendar = () => {
  const today = new Date();

  // 초반 currentDate에 현재 날짜를 보관
  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });

  const handleBeforeMonth = () => {
    // 이전 달로 상태 변경
    if (currentDate.month === 1) {
      setCurrentDate({
        year: currentDate.year - 1,
        month: 12, // 현재 1월일 경우 12월로 설정
      });
    } else {
      setCurrentDate({
        year: currentDate.year,
        month: currentDate.month - 1,
      });
    }
  };

  const handleNextMonth = () => {
    // 다음 달로 상태 변경
    if (currentDate.month === 12) {
      setCurrentDate({
        year: currentDate.year + 1,
        month: 1, // 현재 12월일 경우 1월로 설정
      });
    } else {
      setCurrentDate({
        year: currentDate.year,
        month: currentDate.month + 1,
      });
    }
  };
  return { currentDate, handleBeforeMonth, handleNextMonth };
};

export default useCalendar;
