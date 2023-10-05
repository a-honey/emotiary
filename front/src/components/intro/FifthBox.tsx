import React from 'react';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const FifthBox = () => {
  return (
    <section className={styles.block}>
      <div>지금 시작해보세요! 간단한 일기 작성으로 감정을 표현해보세요</div>
      <div>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
      <Link to="/login" className="doneBtn">
        로그인
      </Link>
      <Link to="/register" className="doneBtn">
        회원가입
      </Link>
    </section>
  );
};

export default FifthBox;
