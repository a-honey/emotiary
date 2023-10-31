import React, { useState } from 'react';

import styles from './index.module.scss';

const EmojiSelect = ({
  emojis,
  toggleIsEmojiSelectOpen,
}: {
  emojis: string;
  toggleIsEmojiSelectOpen: () => void;
}) => {
  // VM 에러 확인 필요
  // emojis를 map 하여 렌더링은 유지하고, selectedEmoji에 하나의 이모지만 넣음 초기상태 ''
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(selectedEmoji);
  };

  console.log(emojis);

  return (
    <div className="modal">
      <form className={styles.emojiSelect} onSubmit={handleSubmit}>
        <label>이모지 선택</label>
        <div className={styles.emojis}>
          {emojis?.split(',').map((emoji) => (
            <div key={emoji}>
              <label>
                <input
                  type="radio"
                  name={emoji}
                  value={emoji}
                  checked={selectedEmoji === emoji}
                  onChange={() => setSelectedEmoji(emoji)}
                />
                <span>{emoji}</span>
                <div>85%</div>
              </label>
            </div>
          ))}
        </div>
        <div className={styles.btns}>
          <button
            className="cancelBtn"
            type="button"
            onClick={toggleIsEmojiSelectOpen}
          >
            다시쓰기
          </button>
          <button className="doneBtn" type="submit">
            선택완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmojiSelect;
