import React, { ChangeEvent, useEffect, useState } from 'react';

import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useGetMyUserData } from '../../../api/get/useGetUserData';
import useImgChange from '../../../hooks/useImgChange';
import ChangePW from './My.ChangePW';
import { usePutUserData } from '../../../api/put/usePutUserData';

const USER_INFO_INITIAL_DATA = {
  email: '',
  username: '',
  id: '',
  description: '',
  latestEmoji: '',
  alarmSetting: '1',
  profileImage: [{ url: '' }],
};

const MyCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenChangePW, setIsOpenChangePW] = useState(false);

  const toggleIsOpenChangePW = () => {
    setIsOpenChangePW((prev) => !prev);
  };

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const { data: userData, isFetching } = useGetMyUserData();

  // 받아온 캐시데이터를 담아야함
  const [userInfoData, setUserInfoData] = useState(
    userData ?? USER_INFO_INITIAL_DATA,
  );

  const {
    id,
    email,
    username,
    description,
    latestEmoji,
    alarmSetting,
    profileImage,
  } = userInfoData;

  const putMutation = usePutUserData(id, toggleIsEditing);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = new FormData();

    if (imgContainer) {
      body.append('filesUpload', imgContainer);
    }

    body.append('username', userInfoData.username);
    body.append('description', userInfoData.description ?? '');
    body.append('alarmSetting', userInfoData?.alarmSetting?.toString() ?? 1);

    putMutation.mutate({
      body,
    });
  };

  const { handleImgChange, imgContainer, imgRef } = useImgChange();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserInfoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <section className={styles.myCard}>
        <img
          ref={imgRef}
          src={
            profileImage[0]?.url
              ? `${process.env.REACT_APP_BASE_URL}/${userInfoData.profileImage[0].url}`
              : 'usure'
          }
          alt={`${username}의 프로필사진`}
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
            <div>
              <label>유저 이름</label>
              <input
                name="username"
                value={userInfoData.username}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div>
              <label>내소개</label>
              <input
                name="description"
                value={userInfoData.description ?? ''}
                onChange={handleInputChange}
                placeholder="소개를 입력해주세요."
              />
            </div>
            <div>
              <label>알람일수</label>
              <select
                name="alarmSetting"
                value={userInfoData.alarmSetting}
                onChange={handleInputChange}
              >
                <option key="1" value={1}>
                  1 일
                </option>
                <option key="2" value={3}>
                  3 일
                </option>
              </select>
            </div>
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
                    setUserInfoData(userData!);
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
            <div className={styles.show}>
              <div>
                <label>이름</label>
                <h2>{username ?? ''}</h2>
              </div>
              <div>
                <label>이메일</label>
                <h2>{email ?? ''}</h2>
              </div>
              <div>
                <label>알림일수</label>
                <h2>{alarmSetting ?? '1일'}</h2>
              </div>
              <div>
                <label>소개</label>
                <p>
                  {!description || description === ''
                    ? '소개를 입력해주세요'
                    : description}
                </p>
              </div>
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
          </>
        )}
      </section>
      {isOpenChangePW && (
        <ChangePW toggleIsOpenChangePW={toggleIsOpenChangePW} />
      )}
    </>
  );
};

export default MyCard;
