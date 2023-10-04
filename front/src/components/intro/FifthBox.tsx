import React from 'react';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const FifthBox = () => {
  return (
    <section className={styles.block}>
      <div>프로젝트 설명</div>
      <div>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
      <Link to="/login">로그인</Link>
      <Link to="/register">회원가입</Link>
    </section>
  );
};

export default FifthBox;
