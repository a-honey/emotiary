import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import { ResEmojiType } from '../../../api/post/usePostDiaryData';
import { SelectedEmojiType } from '../../../api/put/usePutDiaryData.types';
import { usePutSelectedEmoji } from '../../../api/put/usePutDiaryData';

const EmojiSelect = ({
  id,
  emojis,
  toggleIsEmojiSelectOpen,
}: {
  id: string;
  emojis: ResEmojiType[];
  toggleIsEmojiSelectOpen: () => void;
}) => {
  const putMutation = usePutSelectedEmoji();

  const [body, setBody] = useState<SelectedEmojiType>({
    selectedEmoji: '',
    selectedEmotion: '중립',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    putMutation.mutate({ id, body });
  };

  console.log(emojis);
  useEffect(() => {}, [emojis]);

  return (
    <div className="modal">
      <form className={styles.emojiSelect} onSubmit={handleSubmit}>
        <label>이모지 선택</label>
        <div className={styles.emojis}>
          {emojis?.map((emoji) => (
            <div key={emoji.emotion}>
              <label>
                <input
                  type="radio"
                  name={emoji.emotion}
                  value={emoji.emoji}
                  checked={body.selectedEmoji === emoji.emoji}
                  onChange={() =>
                    setBody({
                      selectedEmoji: emoji.emoji,
                      selectedEmotion: emoji.emotion,
                    })
                  }
                />
                <span>{emoji.emoji}</span>
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
