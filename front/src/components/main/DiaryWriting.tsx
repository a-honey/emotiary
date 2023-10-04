import React from 'react';

import { useState } from 'react';
import styles from './index.module.scss';

const initialData = {
  title: '',
  content: '',
};

const DiaryWriting = ({
  handleIsDiaryWriting,
}: {
  handleIsDiaryWriting: (boolean: boolean) => void;
}) => {
  const [content, setContent] = useState(initialData);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div className="modal">
      <form className={styles.container}>
        <div className={styles.name}>일기 작성</div>
        <div className={styles.content}>
          <label>제목</label>
          <input placeholder="일기 제목을 입력하세요" />
          <label>공개여부</label>
          <input />
          <label>내용</label>
          <textarea
            cols={90}
            rows={15}
            name="myTextarea"
            value="초기 텍스트"
            placeholder="일기 내용을 입력하세요"
          />
        </div>
        <div className={styles.btns}>
          <button
            className="cancelBtn"
            type="button"
            onClick={() => {
              handleIsDiaryWriting(false);
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
