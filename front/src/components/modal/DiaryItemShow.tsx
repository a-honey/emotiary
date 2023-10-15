import React, { useState } from 'react';
import styles from './index.module.scss';
import DiaryComment from './DiaryComment';
import DiaryReplyAdd from './DiaryReplyAdd';
import { useGetDiaryData } from '../../api/get/useGetDiaryData';
import { instance } from '../../api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 작성자 id가 로그인 id와 같을 경우, 수정 버튼 활성화, 다를경우 비활성화
// 비공개일 경우 그냥 안띄우기, 친구공개일 경우 자물쇠 아이콘 + 친구만 볼 수 있습니다 모달 안에 띄우기
const DiaryItemShow = ({
  id,
  toggleIsOpenModal,
}: {
  id: string;
  toggleIsOpenModal: () => void;
}) => {
  const { data, isFetching } = useGetDiaryData({ id });

  const {
    id: diaryId,
    authorId,
    createdDate,
    title,
    content,
    is_public,
    emoji,
  } = data.data;

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      await instance.post(`/favorites/${diaryId}`);
    },
    {
      onSuccess: () => {
        // 다이어리가 새로 생겼으므로, myAllDiarysData, myDiaryData 변경 필요
        queryClient.invalidateQueries(['diaryData', diaryId]);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  const handleLikeClick = () => {
    mutation.mutate();
  };
  return (
    <div className="modal">
      <div className={styles.modalContainer}>
        <h3>{createdDate}</h3>
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
        <div className={styles.like} onClick={handleLikeClick}>
          ♡
        </div>
        <DiaryComment />
        <button className="cancelBtn" onClick={toggleIsOpenModal}>
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
    setIsAdding((prev) => !prev);
  };
  return (
    <>
      <div>
        {isReply && <div>L</div>}
        <div>댓글내용</div>
        <div>작성자이름</div>
        <button onClick={handleIsAdding}>+</button>
        {isAdding && <DiaryReplyAdd handleIsAdding={handleIsAdding} />}
      </div>
      <CommentItem isReply />
    </>
  );
};
