import React, { useEffect, useState } from 'react';
import getUserId from '../utils/localStorageHandlers';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../atoms/userIdState';

const withLogin = (InnerComponent: React.FC) => {
  return () => {
    const navigator = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
      if (!userId) {
        alert('로그인이 필요합니다.');
        navigator('/');
      }
    }, [userId, navigator]);

    return userId ? <InnerComponent /> : null;
  };
};

export default withLogin;
