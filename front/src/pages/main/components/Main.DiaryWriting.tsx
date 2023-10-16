import React, { ChangeEvent } from 'react';

import { useState } from 'react';
import styles from './index.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '../../../api/instance';
import getUserId from '../../../utils/localStorageHandlers';

const DIARY_WRITING_INITIAL_DATA = {
  title: '',
  content: '',
  is_public: 'all',
};

const DiaryWriting = ({
  handleIsOpenDiaryWriting,
}: {
  handleIsOpenDiaryWriting: (args: boolean) => void;
}) => {
  const [formData, setFormData] = useState(DIARY_WRITING_INITIAL_DATA);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      await instance.post(`/users/${getUserId}`, formData);
    },
    {
      onSuccess: () => {
        // 다이어리가 새로 생겼으므로, myAllDiarysData, myDiaryData 변경 필요
        queryClient.invalidateQueries(['myDiaryData', 'myAllDiarysData']);
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

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

    mutation.mutate();
  };

  return (
    <div className="modal">
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.name}>일기 작성</div>
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
        <div className={styles.btns}>
          <button
            className="cancelBtn"
            type="button"
            onClick={() => {
              handleIsOpenDiaryWriting(false);
            }}
          >
            작성취소
          </button>
          <button className="doneBtn" type="submit">
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryWriting;
