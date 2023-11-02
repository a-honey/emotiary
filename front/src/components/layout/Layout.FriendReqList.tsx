import React, { useState } from 'react';
import styles from './index.module.scss';
import { useGetFriendData } from '../../api/get/useGetFriendData';
import ImageComponent from '../ImageComponent';
import {
  useAcceptFriendReqMutation,
  useCancelFriendReqMutation,
  useRejectFriendReqMutation,
} from '../../api/post/usePostFriendData';
import { FriendReqCommonResponseType } from '../../api/get/useGetFriendData.types';

const FriendReqList = () => {
  const [isReqList, setIsReqList] = useState(true);

  const { data } = useGetFriendData({
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
            return <ResItem item={item.sentUser} key={item.sentUser.id} />;
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

const ResItem = ({ item }: { item: FriendReqCommonResponseType }) => {
  const postAcceptMutation = useAcceptFriendReqMutation();
  const postRejectMutation = useRejectFriendReqMutation();

  const handleAcceptClick = () => {
    postAcceptMutation.mutate({ id: item.id });
  };

  const handleRejectClick = () => {
    postRejectMutation.mutate({ id: item.id });
  };

  return (
    <div className={styles.reqItemContainer}>
      <div>
        <ImageComponent
          src={
            item?.profileImage?.length > 0
              ? item.profileImage[item.profileImage.length - 1].url
              : null
          }
          alt={`${item.username}의 프로필 사진`}
        />
        {item.username}
      </div>
      <div className={styles.btns}>
        <button className="doneBtn" onClick={handleAcceptClick}>
          수락
        </button>
        <button className="cancelBtn" onClick={handleRejectClick}>
          거절
        </button>
      </div>
    </div>
  );
};

const ReqItem = ({ item }: { item: FriendReqCommonResponseType }) => {
  const postCancelMutation = useCancelFriendReqMutation();

  const handleCancelClick = () => {
    postCancelMutation.mutate({ id: item.id });
  };

  return (
    <div className={styles.reqItemContainer}>
      <div>
        <ImageComponent
          src={
            item?.profileImage?.length > 0
              ? item.profileImage[item.profileImage.length - 1].url
              : null
          }
          alt={`${item.username}의 프로필 사진`}
        />
        {item.username}
      </div>
      <div className={styles.btns}>
        <button className="cancelBtn" onClick={handleCancelClick}>
          취소
        </button>
      </div>
    </div>
  );
};
