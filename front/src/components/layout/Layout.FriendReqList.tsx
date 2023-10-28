import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useGetFriendData } from '../../api/get/useGetFriendData';
import {
  ReceivedUserDataType,
  sentUserDataType,
} from '../../api/get/useGetFriendData.types';
import ImageComponent from '../ImageComponent';

const FriendReqList = () => {
  const [isReqList, setIsReqList] = useState(true);

  const { data, isFetching } = useGetFriendData({
    userReqListType: isReqList ? 'received' : 'sent',
  });

  return (
    <div className={styles.reqListContainer}>
      <div className={styles.selects}>
        <button
          className={isReqList ? styles.ban : ''}
          onClick={() => setIsReqList(true)}
        >
          받은 요청
        </button>
        <button
          className={!isReqList ? styles.ban : ''}
          onClick={() => setIsReqList(false)}
        >
          보낸 요청
        </button>
      </div>
      <div className={styles.itemList}>
        {data?.data?.map((item) => {
          if (isReqList) {
            if ('sentUser' in item) {
              const sentUserItem = item as sentUserDataType;
              return (
                <ResItem
                  item={sentUserItem.sentUser}
                  key={sentUserItem.sentUser.id}
                />
              );
            }
          } else {
            if ('receivedUser' in item) {
              const receivedUserItem = item as ReceivedUserDataType;
              return (
                <ReqItem
                  item={receivedUserItem.receivedUser}
                  key={receivedUserItem.receivedUser.id}
                />
              );
            }
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FriendReqList;

const ResItem = ({ item }: { item: sentUserDataType['sentUser'] }) => {
  return (
    <div className={styles.reqItemContainer}>
      <div>
        <ImageComponent
          src={
            item?.filesUpload.length > 0
              ? item.filesUpload[item.filesUpload.length - 1].url
              : null
          }
          alt={`${item.username}의 프로필 사진`}
        />
        {item.username}
      </div>
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
      <div>
        <ImageComponent
          src={
            item?.filesUpload.length > 0
              ? item.filesUpload[item.filesUpload.length - 1].url
              : null
          }
          alt={`${item.username}의 프로필 사진`}
        />
        {item.username}
      </div>
      <div className={styles.btns}>
        <button className="cancelBtn">취소</button>
      </div>
    </div>
  );
};
