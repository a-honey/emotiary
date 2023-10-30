import React, { ChangeEvent } from 'react';

import { useState } from 'react';
import styles from './index.module.scss';
import useImgChange from '../../../hooks/useImgChange';
import EmojiSelect from './Main.EmojiSelect';
import { usePostDiaryData } from '../../../api/post/usePostDiaryData';
import { formatDatetoString } from '../../../utils/formatHandlers';
import { DiaryBodyType } from '../../../api/post/usePostDiaryData.types';
import post_none from '../../../assets/post_none.png';

const DIARY_WRITING_INITIAL_DATA = {
  title: '',
  content: '',
  is_public: 'all',
  createdDate: '2023-10-31',
};

const DiaryWriting = ({
  day,
  toggleIsOpenModal,
}: {
  day: Date;
  toggleIsOpenModal: () => void;
}) => {
  const [imgsContainer, setImgsContainer] = useState<File[]>([]);
  const [emojis, setEmojis] = useState('');

  const [formData, setFormData] = useState<Record<string, string>>(
    DIARY_WRITING_INITIAL_DATA,
  );
  const [isEmojiSelectOpen, setIsEmojiSelectOpen] = useState(false);

  const handleAddImgsContainer = (img: File) => {
    setImgsContainer((prev) => [...prev, img]);
  };

  const toggleIsEmojiSelectOpen = () => {
    setIsEmojiSelectOpen((prev) => !prev);
  };

  const handleOnSuccess = (emojis: string) => {
    setEmojis(emojis);
    toggleIsEmojiSelectOpen();
  };

  const postMutation = usePostDiaryData(handleOnSuccess);

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

    const body = new FormData();

    imgsContainer?.forEach((item) => body.append('filesUpload', item));

    Object.keys(formData).forEach((key) => {
      if (key !== 'createdDate') {
        body.append(key, formData[key]);
      }
    });

    body.append('createdDate', formatDatetoString(day));

    postMutation.mutate({
      body,
    });

    setIsEmojiSelectOpen(true);
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
            <ImgInputItem handleAddImgsContainer={handleAddImgsContainer} />
            <ImgInputItem handleAddImgsContainer={handleAddImgsContainer} />
            <ImgInputItem handleAddImgsContainer={handleAddImgsContainer} />
            <ImgInputItem handleAddImgsContainer={handleAddImgsContainer} />
            <ImgInputItem handleAddImgsContainer={handleAddImgsContainer} />
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
            onClick={toggleIsOpenModal}
          >
            작성취소
          </button>
          <button className="doneBtn" type="submit">
            작성완료
          </button>
        </div>
      </form>
      {isEmojiSelectOpen && (
        <EmojiSelect
          emojis={emojis!}
          toggleIsEmojiSelectOpen={toggleIsEmojiSelectOpen}
        />
      )}
    </div>
  );
};

export default DiaryWriting;

const ImgInputItem = ({
  handleAddImgsContainer,
}: {
  handleAddImgsContainer: (img: File) => void;
}) => {
  const { handleImgChange, imgRef } = useImgChange(handleAddImgsContainer);
  return (
    <div>
      <img ref={imgRef} src={post_none} alt="일기 사진 및 비디오 업로드" />
      <input
        type="file"
        accept="image/*, video/*"
        alt="일기 사진 및 비디오 업로드"
        onChange={handleImgChange}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImgChange}
      />
    </div>
  );
};
