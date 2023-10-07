import React, { useState } from 'react';
import styles from './index.module.scss';
import DiaryComment from './DiaryComment';
import DiaryReplyAdd from './DiaryReplyAdd';

// 작성자 id가 로그인 id와 같을 경우, 수정 버튼 활성화, 다를경우 비활성화
// 비공개일 경우 그냥 안띄우기, 친구공개일 경우 자물쇠 아이콘 + 친구만 볼 수 있습니다 모달 안에 띄우기
const DiaryItemShow = ({
  handleIsOpenModal,
}: {
  handleIsOpenModal: () => void;
}) => {
  return (
    <div className="modal">
      <div className={styles.modalContainer}>
        <h3>username의 일기</h3>
        <div>
          <h1>일기제목</h1>
          <p>일기내용</p>
        </div>
        <div className={styles.like}>♡</div>
        <DiaryComment />
        <button className="cancelBtn" onClick={handleIsOpenModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default DiaryItemShow;

const CommentItem = ({ isReply }: { isReply: boolean }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleIsAdding = () => {
    setIsAdding(false);
  };
  return (
    <>
      <div>
        {isReply && <div>L</div>}
        <div>댓글내용</div>
        <div>작성자이름</div>
        <button
          onClick={() => {
            setIsAdding(true);
          }}
        >
          +
        </button>
        {isAdding && <DiaryReplyAdd handleIsAdding={handleIsAdding} />}
      </div>
      <CommentItem isReply />
    </>
  );
};
