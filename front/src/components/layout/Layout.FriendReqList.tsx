import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useGetFriendData } from '../../api/get/useGetFriendData';
import { ReceivedUserDataType } from '../../api/get/useGetFriendData.types';

const FriendReqList = () => {
  const [isReqList, setIsReqList] = useState(true);

  const { data, isFetching } = useGetFriendData({
    userReqListType: isReqList ? 'received' : 'sent',
  });

  return (
    <div className={styles.reqListContainer}>
      <div className={styles.selects}>
        <button
          className={isReqList && styles.ban}
          onClick={() => setIsReqList(true)}
        >
          받은 요청
        </button>
        <button
          className={!isReqList && styles.ban}
          onClick={() => setIsReqList(false)}
        >
          보낸 요청
        </button>
      </div>
      <div className={styles.itemList}>
        {data?.data.map((item: ReceivedUserDataType) => {
          if (isReqList) {
            return (
              <ResItem item={item.receivedUser} key={item.receivedUser.id} />
            );
          } else {
            return (
              <ReqItem item={item.receivedUser} key={item.receivedUser.id} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FriendReqList;

const ResItem = ({ item }: { item: ReceivedUserDataType['receivedUser'] }) => {
  return (
    <div className={styles.reqItemContainer}>
      <div>{item.username}</div>
      <div className={styles.btns}>
        <button className="doneBtn">수락</button>
        <button className="cancelBtn">거절</button>
      </div>
    </div>
  );
};

const ReqItem = ({ item }: { item: ReceivedUserDataType['receivedUser'] }) => {
  return (
    <div className={styles.reqItemContainer}>
      <div>{item.username}</div>
      <div className={styles.btns}>
        <button className="cancelBtn">취소</button>
      </div>
    </div>
  );
};
