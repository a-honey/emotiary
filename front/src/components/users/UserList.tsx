import React from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../utils/handleImg';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  return (
    <div className={styles.block}>
      <h2>유저 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>내 친구만 보기</div>
      </div>
      <div className={styles.listBlock}>
        <UserItem />
        <UserItem />
      </div>
    </div>
  );
};

export default UserList;

const UserItem = () => {
  const navigator = useNavigate();

  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${2}`);
      }}
    >
      <div>
        <img src="" alt="의 프로필사진" onError={handleImgError} />
        <div className={styles.emoji}>😆</div>
      </div>
      <div>작성자명</div>
      <div>안녕하세요~</div>
    </div>
  );
};
