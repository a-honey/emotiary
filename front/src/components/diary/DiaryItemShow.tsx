import React, { useEffect, useState } from 'react';
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
import ImagesComponent from '../ImagesComponent';
import { DiaryItemType } from '../../api/get/useGetDiaryData.types';
import { usePutDiaryData } from '../../api/put/usePutDiaryData';
import { useDeleteDiaryData } from '../../api/delete/useDeleteDiaryData';

const INITIAL_DAIARY_DATA: DiaryItemType = {
  id: '',
  authorId: '',
  createdDate: new Date('2023-10-24T00:00:00.000Z'),
  title: '',
  content: '',
  is_public: 'all',
  emoji: '',
  favoriteCount: 0,
  author: {
    id: '',
    username: '',
    email: '',
    profileImage: [],
  },
  filesUpload: [],
};

// 작성자 id가 로그인 id와 같을 경우, 수정 버튼 활성화, 다를경우 비활성화
// 비공개일 경우 그냥 안띄우기, 친구공개일 경우 자물쇠 아이콘 + 친구만 볼 수 있습니다 모달 안에 띄우기
const DiaryItemShow = ({
  id,
  toggleIsOpenModal,
}: {
  id: string;
  toggleIsOpenModal: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigator = useNavigate();

  const queryClient = useQueryClient();

  const { data: diaryData, isFetching: isDiaryDataFetching } = useGetDiaryData({
    id,
  });

  const [diaryBodyData, setDiaryBodyData] = useState(INITIAL_DAIARY_DATA);

  const { data: diaryCommentData, isFetching: isDiaryCommentDataFetching } =
    useGetCommentData({ id });

  const mutation = usePostLikeDiaryData({ id, isNetwork: false });
  const deleteMutation = useDeleteDiaryData({ id });

  const handleLikeClick = () => {
    mutation.mutate();
  };

  const putMutation = usePutDiaryData(id);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDiaryBodyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    putMutation.mutate({ body: diaryBodyData });
  };

  const handleDeleteClick = () => {
    deleteMutation.mutate();
    toggleIsOpenModal();
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
      queryClient.invalidateQueries(queryKeys.myAllDiarysData({}));
    };
  }, [queryClient]);

  useEffect(() => {
    if (diaryData) {
      setDiaryBodyData(diaryData);
    }
  }, [diaryData]);

  return (
    <div className="modal">
      <div className={styles.modalContainer}>
        {isDiaryDataFetching ? (
          <div>로딩중</div>
        ) : isEditing ? (
          <form className={styles.diaryContent} onSubmit={handleSubmit}>
            <div>
              <label>제목</label>
              <input
                name="title"
                value={diaryBodyData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>내용</label>
              <textarea
                name="content"
                value={diaryBodyData.content}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                type="button"
                className="cancelBtn"
                onClick={() => {
                  setDiaryBodyData(diaryData!);
                  setIsEditing(false);
                }}
              >
                취소
              </button>
              <button type="submit" className="doneBtn">
                수정
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.diaryContent}>
            <div className={styles.titles}>
              <h2>
                {diaryBodyData.title}
                <span>{diaryBodyData.emoji}</span>
              </h2>

              <div className={styles.like} onClick={handleLikeClick}>
                {diaryBodyData.favoriteCount === 0 ? (
                  <GoHeart />
                ) : (
                  <GoHeartFill />
                )}
                <div>{diaryBodyData.favoriteCount}</div>
              </div>
            </div>
            <div className={styles.diaryInfo}>
              <div>
                {`${new Date(diaryBodyData.createdDate).getFullYear()}년 ${
                  new Date(diaryBodyData.createdDate).getMonth() + 1
                }월 ${new Date(diaryBodyData.createdDate).getDate()}일`}
              </div>
              <div
                className={styles.userInfo}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator(`/user/${diaryBodyData.authorId}`);
                }}
              >
                <ImageComponent
                  src={diaryBodyData.author.profileImage?.at(-1)?.url ?? null}
                  alt={`${diaryBodyData.author.username}의 프로필사진`}
                />
                <div>{diaryBodyData.author.username}</div>
              </div>
            </div>
            <div className={styles.contentContainer}>
              {diaryBodyData.filesUpload &&
                diaryBodyData.filesUpload.length > 0 &&
                (diaryBodyData.filesUpload.length === 1 ? (
                  <ImageComponent
                    src={diaryBodyData.filesUpload[0]?.url}
                    alt="다이어리 이미지"
                  />
                ) : (
                  <ImagesComponent imgDatas={diaryBodyData.filesUpload} />
                ))}
              <p>{diaryBodyData.content}</p>
            </div>
            {localStorage.getItem('userId') === diaryBodyData.authorId && (
              <>
                <button className="doneBtn" onClick={() => setIsEditing(true)}>
                  수정
                </button>
                <button className="cancelBtn" onClick={handleDeleteClick}>
                  삭제
                </button>
              </>
            )}
          </div>
        )}
        {!isDiaryDataFetching && (
          <DiaryComment data={diaryCommentData} id={diaryBodyData.id} />
        )}
        <button className="cancelBtn" onClick={toggleIsOpenModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default DiaryItemShow;
