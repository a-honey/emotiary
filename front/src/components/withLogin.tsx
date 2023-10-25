import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
