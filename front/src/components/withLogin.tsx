import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withLogin = (InnerComponent: React.FC) => {
  return () => {
    const navigator = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
      if (!userId) {
        alert('로그인이 필요합니다.');
        navigator('/signin');
      }
    }, [userId, navigator]);

    return userId ? <InnerComponent /> : null;
  };
};

export default withLogin;

/** 로그인이 된 상태라서 접근 불가능하게 하는 HOC */
export const withLoginSoNot = (InnerComponent: React.FC) => {
  return () => {
    const navigator = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
      if (userId) {
        navigator('/main');
      }
    }, [userId, navigator]);

    return <InnerComponent />;
  };
};
