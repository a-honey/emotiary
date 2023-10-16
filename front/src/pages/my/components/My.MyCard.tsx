import React, { ChangeEvent, useState } from 'react';

import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useGetMyUserData } from '../../../api/get/useGetUserData';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { formDataInstance, instance } from '../../../api/instance';
import useImgChange from '../../../hooks/useImgChange';

interface UserInfoType {
  email: string;
  username: string;
  userId: string;
  description: string;
}

// formdata img api 요청 따로할지 미정
const MyCard = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: userData, isLoading } = useGetMyUserData();

  // 받아온 캐시데이터를 담아야함
  const [userInfoData, setUserInfoData] = useState<UserInfoType>({
    email: '가짜이름',
    username: '가짜이름',
    userId: '가짜이름',
    description: '가짜이름',
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await formDataInstance.put(`/users/${1}`, {
        username: '가짜닉네임',
        email: 'echkaaaa2@naver.com',
        description: 'hi',
        profileImage: imgContainer,
      });
      return;
    },
    {
      onSuccess: () => {
        // 업데이트가 성공하면 쿼리를 다시 실행하여 최신 데이터를 가져옵니다.
        queryClient.invalidateQueries({ queryKey: ['myUserData'] });
      },
      onError: (error) => {
        console.error('useMutation api 요청 에러', error);
      },
    },
  );

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate();
  };

  const { handleImgChange, imgContainer, imgRef } = useImgChange();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfoData((prevData: UserInfoType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className={styles.myCard}>
      <img ref={imgRef} alt="의 프로필사진" onError={handleImgError} />
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="file"
            accept="image/*"
            alt="프로필 사진 업로드"
            onChange={handleImgChange}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleImgChange}
          />
          <label>유저 이름</label>
          <input
            name="username"
            value={userInfoData.username}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요."
          />
          {/* 변경가능??? */}
          <label>이메일</label>
          <input
            name="email"
            value={userInfoData.email}
            onChange={handleInputChange}
            placeholder="이메일을 입력해주세요."
          />
          <label>내소개</label>
          <input
            name="description"
            value={userInfoData.description}
            onChange={handleInputChange}
            placeholder="소개를 입력해주세요."
          />
          <div className={styles.btns}>
            <button type="submit">수정하기</button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {
                // 저장해둔 이전 데이터로 상태 변경
                queryClient.invalidateQueries({ queryKey: ['myUserData'] });
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
              className="doneBtn"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>
            <button className="doneBtn">비밀번호 변경</button>
            <button className="cancelBtn">회원탈퇴</button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyCard;
