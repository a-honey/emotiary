import React, { useState } from 'react';
import styles from './DiaryComment.module.scss';
import DiaryReplyAdd from './DiaryCommentReplyAdd';
import { useQueryClient } from '@tanstack/react-query';
import { usePostCommentData } from '../../api/mutation/usePostDiaryData';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../ImageComponent';

interface CommentDataType {
  id: string;
  diaryId: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    profileImage: string;
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
  console.log(data);
  const [comment, setComment] = useState('');

  const queryClient = useQueryClient();

  const postMutation = usePostCommentData(queryClient, id as string);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postMutation.mutate({ body: { content: comment } });
  };

  return (
    <>
      <div className={styles.comments}>
        {data?.map((item, index) => (
          <CommentItem data={item} index={index} isReply={false} />
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
    <div className={styles.commentItemContainer}>
      <div>{index + 1} |</div>
      {isReply && <div>L</div>}
      <div>{data.content}</div>
      <div
        className={styles.userInfo}
        onClick={() => {
          navigator(`/user/${data.author.id}`);
        }}
      >
        <ImageComponent
          src={data.author.profileImage}
          alt={`${data.author.username}의 프로필사진`}
        />
        <div>{data.author.username}</div>
      </div>
      <button onClick={handleIsAdding} className="doneBtn">
        +
      </button>
      {isAdding && <DiaryReplyAdd handleIsAdding={handleIsAdding} />}
    </div>
  );
};
