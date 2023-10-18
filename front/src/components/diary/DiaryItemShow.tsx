import React, { useState } from 'react';
import styles from './DiaryItemShow.module.scss';
import DiaryComment from './DiaryComment';
import DiaryReplyAdd from './DiaryCommentReplyAdd';
import { useGetDiaryData } from '../../api/get/useGetDiaryData';
import { instance } from '../../api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import ImageComponent from '../ImageComponent';
import { useNavigate } from 'react-router-dom';
import { useGetCommentData } from '../../api/get/userGetCommendData';

// 작성자 id가 로그인 id와 같을 경우, 수정 버튼 활성화, 다를경우 비활성화
// 비공개일 경우 그냥 안띄우기, 친구공개일 경우 자물쇠 아이콘 + 친구만 볼 수 있습니다 모달 안에 띄우기
const DiaryItemShow = ({
  id,
  toggleIsOpenModal,
}: {
  id: string;
  toggleIsOpenModal: () => void;
}) => {
  const navigator = useNavigate();

  const { data: diaryData, isFetching: isDiaryDataFetching } = useGetDiaryData({
    id,
  });

  const { data: diaryCommentData, isFetching: isDiaryCommentDataFetching } =
    useGetCommentData({ id });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      await instance.post(`/favorites/${diaryData.id}`);
      return;
    },
    {
      onSuccess: () => {
        // 다이어리가 새로 생겼으므로, myAllDiarysData, myDiaryData 변경 필요
        queryClient.invalidateQueries(['diaryData', diaryData.id]);
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
        {isDiaryDataFetching ? (
          <div>로딩중</div>
        ) : (
          <div className={styles.diaryContent}>
            <div className={styles.titles}>
              <h2>{diaryData.title}</h2>
              <div className={styles.like} onClick={handleLikeClick}>
                {diaryData.favoriteCount === 0 ? <GoHeart /> : <GoHeartFill />}
                <div>{diaryData.favoriteCount}</div>
              </div>
            </div>
            <div className={styles.diaryInfo}>
              <div>
                {diaryData.createdDate.split('T')[0].split('-')[0]}년{' '}
                {diaryData.createdDate.split('T')[0].split('-')[1]}월{' '}
                {diaryData.createdDate.split('T')[0].split('-')[2]}일{' '}
              </div>
              <div
                className={styles.userInfo}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator(`/user/${diaryData.authorId}`);
                }}
              >
                <ImageComponent
                  src={diaryData.author.profileImage ?? '/user_none.png'}
                  alt={`${diaryData.author.username}의 프로필사진`}
                />
                <div>{diaryData.author.username}</div>
              </div>
            </div>
            <p>{diaryData.content}</p>
          </div>
        )}
        {!isDiaryDataFetching && (
          <DiaryComment data={diaryCommentData} id={diaryData.id} />
        )}
        <button className="cancelBtn" onClick={toggleIsOpenModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default DiaryItemShow;
