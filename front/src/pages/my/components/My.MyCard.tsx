import React, { useState } from 'react';

import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useGetMyUserData } from '../../../api/get/useGetUserData';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { instance } from '../../../api/instance';

const MyCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: userData, isLoading } = useGetMyUserData();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await instance.put(`/users/${1}`, {
        username: '가짜닉네임',
        email: 'echkaaaa2@naver.com',
        description: 'hi',
      });
    },
    {
      onSuccess: () => {
        // 업데이트가 성공하면 쿼리를 다시 실행하여 최신 데이터를 가져옵니다.
        queryClient.invalidateQueries({ queryKey: ['myUserData'] });
      },
    },
  );

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <section className={styles.myCard}>
      <img src="" alt="의 프로필사진" onError={handleImgError} />
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <label>유저 이름</label>
          <input />
          <label>이메일</label>
          <input />
          <label>내소개</label>
          <input />
          <div className={styles.btns}>
            <button type="submit">수정하기</button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {
                // 저장해둔 이전 데이터로 상태 변경
                setIsEditing(false);
              }}
            >
              취소하기
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <h2>유저 이름</h2>
            <h3>반가워</h3>
            <h3>유저 소개</h3>
          </div>
          <div className={styles.btns}>
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>
            <button className="cancelBtn">회원탈퇴</button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyCard;
