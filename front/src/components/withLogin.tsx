import React, { useEffect } from 'react';
import getUserId from '../utils/localStorageHandlers';
import { useNavigate } from 'react-router-dom';

const withLogin = (InnerComponent: React.FC) => {
  return () => {
    const navigator = useNavigate();

    const userId = getUserId;
    useEffect(() => {
      if (!userId) {
        alert('로그인이 필요합니다.');
        navigator('/intro');
        return;
      }
    }, [userId, navigator]);

    return <InnerComponent />;
  };
};

export default withLogin;
