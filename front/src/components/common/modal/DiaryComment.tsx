import React from 'react';
import styles from './index.module.scss';

const DiaryComment = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input placeholder="댓글을 입력해주세요." />
      <button type="submit" className="doneBtn">
        +
      </button>
    </form>
  );
};

export default DiaryComment;
