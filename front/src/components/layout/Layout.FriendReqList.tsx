import React from 'react';
import styles from './index.module.scss';

const FriendReqList = () => {
  return (
    <div className={styles.reqListContainer}>
      <ReqItem />
      <ReqItem />
    </div>
  );
};

export default FriendReqList;

const ReqItem = () => {
  return (
    <div className={styles.reqItemContainer}>
      <div>username </div>
      <div className={styles.btns}>
        <button>수락</button>
        <button>거절</button>
      </div>
    </div>
  );
};
