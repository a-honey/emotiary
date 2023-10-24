import React, { ChangeEvent } from 'react';

import { useState } from 'react';
import styles from './index.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import getUserId from '../../../utils/localStorageHandlers';
import useImgChange from '../../../hooks/useImgChange';
import EmojiSelect from './Main.EmojiSelect';
import { usePostDiaryData } from '../../../api/post/usePostDiaryData';
import { formatDatetoString } from '../../../utils/formatHandlers';
import { DiaryBodyType } from '../../../api/post/usePostDiaryData.types';

const DIARY_WRITING_INITIAL_DATA = {
  title: '',
  content: '',
  is_public: 'all',
  emoji: '🥰',
  emotion: '',
  createdDate: '2023-10-31',
};

const DiaryWriting = ({
  day,
  handleIsOpenDiaryWriting,
}: {
  day: Date;
  handleIsOpenDiaryWriting: () => void;
}) => {
  const [formData, setFormData] = useState<DiaryBodyType>(
    DIARY_WRITING_INITIAL_DATA,
  );
  const [isEmojiSelectOpen, setIsEmojiSelectOpen] = useState(false);

  const toogleIsEmojiSelectOpen = () => {
    setIsEmojiSelectOpen((prev) => !prev);
  };

  const queryClient = useQueryClient();

  const postMutation = usePostDiaryData(queryClient, handleIsOpenDiaryWriting);

  const { handleImgChange, imgContainer, imgRef } = useImgChange();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsEmojiSelectOpen(true);
    postMutation.mutate({
      body: {
        ...formData,
        createdDate: formatDatetoString(day),
        emotion: 'happiness',
      },
    });
  };

  return (
    <div className="modal">
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.name}>
          {`${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일 `}
          일기 작성
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.imgContainer}>
            <img ref={imgRef} src="/post_none.png" alt="사진 업로드" />
            <input
              type="file"
              accept="image/*"
              alt="프로필 사진 업로드"
              onChange={handleImgChange}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImgChange}
            />
          </div>
          <div className={styles.content}>
            <label>제목</label>
            <input
              type=" text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="일기 제목을 입력하세요"
            />
            <label>공개여부</label>
            <select
              name="is_public"
              value={formData.is_public}
              onChange={handleInputChange}
            >
              <option key="all" value="all">
                전체공개
              </option>
              <option key="friend" value="friend">
                친구만공개
              </option>
              <option key="private" value="private">
                비공개
              </option>
            </select>
            <label>내용</label>
            <textarea
              cols={90}
              rows={15}
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="일기 내용을 입력하세요"
            />
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className="cancelBtn"
            type="button"
            onClick={handleIsOpenDiaryWriting}
          >
            작성취소
          </button>
          <button className="doneBtn" type="submit">
            작성완료
          </button>
          {isEmojiSelectOpen && (
            <EmojiSelect toogleIsEmojiSelectOpen={toogleIsEmojiSelectOpen} />
          )}
        </div>
      </form>
    </div>
  );
};

export default DiaryWriting;
