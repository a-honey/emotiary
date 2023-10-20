import React from 'react';

import styles from './index.module.scss';

const EmojiSelect = ({
  toogleIsEmojiSelectOpen,
}: {
  toogleIsEmojiSelectOpen: () => void;
}) => {
  return (
    <div className="modal">
      <form className={styles.emojiSelect}>
        <label>이모지 선택</label>
        <div className={styles.emojis}>
          <div>🥰</div>
          <div>🤣</div>
          <div>😊</div>
        </div>
        <div className={styles.btns}>
          <button className="cancelBtn">다시쓰기</button>
          <button
            className="doneBtn"
            type="button"
            onClick={toogleIsEmojiSelectOpen}
          >
            선택완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmojiSelect;
