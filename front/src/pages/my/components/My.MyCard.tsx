import React, { ChangeEvent, useEffect, useState } from 'react';

import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useGetMyUserData } from '../../../api/get/useGetUserData';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { formDataInstance, instance } from '../../../api/instance';
import useImgChange from '../../../hooks/useImgChange';
import ChangePW from './My.ChangePW';

interface UserInfoType {
  email: string;
  username: string;
  userId: string;
  description: string;
  latestEmoji: string;
}

const USER_INFO_INITIAL_DATA = {
  email: '',
  username: '',
  userId: '',
  description: '',
  latestEmoji: '',
};

// formdata img api 요청 따로할지 미정
const MyCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenChangePW, setIsOpenChangePW] = useState(false);

  const toggleIsOpenChangePW = () => {
    setIsOpenChangePW((prev) => !prev);
  };

  const { data: userData, isFetching } = useGetMyUserData();

  // 받아온 캐시데이터를 담아야함
  const [userInfoData, setUserInfoData] = useState(USER_INFO_INITIAL_DATA);

  const { email, username, description, latestEmoji } = userInfoData;

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async () => {
      await formDataInstance.put(`/users/${1}`, {
        ...userData,
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

  useEffect(() => {
    if (userData) {
      // userData를 받아오면 userInfoData를 업데이트
      setUserInfoData(userData);
    }
  }, [userData]);

  return (
    <section className={styles.myCard}>
      <img
        ref={imgRef}
        src={'/user_none.png'}
        alt="의 프로필사진"
        onError={handleImgError}
      />
      <div>{latestEmoji}</div>
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
          <label>내소개</label>
          <input
            name="description"
            value={userInfoData.description}
            onChange={handleInputChange}
            placeholder="소개를 입력해주세요."
          />
          <div className={styles.btns}>
            <button type="submit" className="doneBtn">
              수정완료
            </button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {
                const confirmDelete =
                  window.confirm('변경사항이 저장되지 않았습니다.');
                if (confirmDelete) {
                  setUserInfoData(userData);
                  setIsEditing(false);
                  return;
                } else {
                  return;
                }
              }}
            >
              수정취소
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <label>이름</label>
            <h2>{username ?? ''}</h2>
            <label>이메일</label>
            <h2>{email ?? ''}</h2>
            <label>소개</label>
            <h3>{description ?? '소개를 입력해주세요'}</h3>
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
            <button className="doneBtn" onClick={toggleIsOpenChangePW}>
              비밀번호 변경
            </button>
            <button className="cancelBtn">회원탈퇴</button>
          </div>
          {isOpenChangePW && (
            <ChangePW toggleIsOpenChangePW={toggleIsOpenChangePW} />
          )}
        </>
      )}
    </section>
  );
};

export default MyCard;
