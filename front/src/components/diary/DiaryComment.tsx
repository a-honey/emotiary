import React, { useState } from 'react';
import styles from './DiaryComment.module.scss';
import { usePostCommentData } from '../../api/post/usePostDiaryData';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../ImageComponent';

interface CommentDataType {
  id: string;
  diaryId: string;
  content: string;
  createdAt: string;
  reComment: [];
  emoji: string;
  author: {
    id: string;
    username: string;
    profileImage: { id: number; url: string }[];
  };
}

//** 댓글을 보여주는 컴포넌트 + 댓글 추가 컴포넌트*/
const DiaryComment = ({
  data,
  id,
}: {
  data: CommentDataType[];
  id: string;
}) => {
  const [comment, setComment] = useState('');

  const postMutation = usePostCommentData(id as string);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postMutation.mutate({ body: { content: comment } });
  };

  return (
    <>
      <div className={styles.comments}>
        {data?.map((item, index) => (
          <CommentItem
            data={item}
            key={item.id}
            index={index}
            isReply={false}
          />
        ))}
      </div>
      <form className={styles.commentAddcontainer} onSubmit={handleSubmit}>
        <input
          placeholder="댓글을 입력해주세요."
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button type="submit" className="doneBtn">
          +
        </button>
      </form>
    </>
  );
};

export default DiaryComment;

//** 댓글을 보여주는 컴포넌트 */
const CommentItem = ({
  index,
  data,
  isReply,
}: {
  index: number;
  data: CommentDataType;
  isReply: boolean;
}) => {
  const navigator = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleIsAdding = () => {
    setIsAdding((prev) => !prev);
  };
  return (
    <>
      <div className={styles.commentItemContainer}>
        <div>{index + 1}</div>
        {isReply && <div>L</div>}
        <div>{`${data.content} ${data.emoji}`}</div>
        <div
          className={styles.userInfo}
          onClick={() => {
            navigator(`/user/${data.author.id}`);
          }}
        >
          <ImageComponent
            src={data.author.profileImage.at(-1)?.url ?? null}
            alt={`${data.author.username}의 프로필사진`}
          />
          <div>{data.author.username}</div>
        </div>
        {!isAdding && (
          <button onClick={handleIsAdding} className="doneBtn">
            +
          </button>
        )}
      </div>
      {isAdding && (
        <DiaryReplyAdd
          handleIsAdding={handleIsAdding}
          id={data.id}
          username={data.author.username}
        />
      )}
    </>
  );
};

/** 댓글의 답글 추가 컴포넌트 */
const DiaryReplyAdd = ({
  handleIsAdding,
  id,
  username,
}: {
  username: string;
  id: string;
  handleIsAdding: () => void;
}) => {
  const [comment, setComment] = useState('');

  const postMutation = usePostCommentData(id as string, handleIsAdding);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postMutation.mutate({
      body: { content: comment, nestedComment: id },
    });
  };
  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();

    handleIsAdding();
  };

  return (
    <form className={styles.replayAddcontainer} onSubmit={handleSubmit}>
      <div>L</div>
      <input
        placeholder={`@${username} 님에게 답글을 입력해주세요.`}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className={styles.btns}>
        <button className="doneBtn">완료</button>
        <button onClick={handleButtonClick} type="button" className="cancelBtn">
          취소
        </button>
      </div>
    </form>
  );
};
