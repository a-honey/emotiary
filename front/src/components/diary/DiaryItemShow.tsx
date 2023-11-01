import React, { useEffect } from 'react';
import styles from './DiaryItemShow.module.scss';
import DiaryComment from './DiaryComment';
import { useGetDiaryData } from '../../api/get/useGetDiaryData';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import ImageComponent from '../ImageComponent';
import { useNavigate } from 'react-router-dom';
import { useGetCommentData } from '../../api/get/useGetCommentData';
import { usePostLikeDiaryData } from '../../api/post/usePostDiaryData';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryKeys';

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

  const queryClient = useQueryClient();

  const { data: diaryData, isFetching: isDiaryDataFetching } = useGetDiaryData({
    id,
  });

  const { data: diaryCommentData, isFetching: isDiaryCommentDataFetching } =
    useGetCommentData({ id });

  const mutation = usePostLikeDiaryData({ id, isNetwork: false });

  const handleLikeClick = () => {
    mutation.mutate();
  };

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries(
        queryKeys.diarysData({
          emotion: null,
          select: null,
          page: null,
        }),
      );
    };
  }, [queryClient]);

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
                {`${new Date(diaryData.createdDate).getFullYear()}년 ${
                  new Date(diaryData.createdDate).getMonth() + 1
                }월 ${new Date(diaryData.createdDate).getDate()}일`}
              </div>
              <div
                className={styles.userInfo}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator(`/user/${diaryData.authorId}`);
                }}
              >
                <ImageComponent
                  src={diaryData.author.profileImage}
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
