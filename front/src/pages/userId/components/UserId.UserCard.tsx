import React from 'react';

import { handleImgError } from '../../../utils/imgHandlers';

const UserCard = () => {
  return (
    <div>
      <img src="" alt="의 프로필사진" onError={handleImgError} />
      <div>
        <h2>유저 이름</h2>
        <h3>반가워</h3>
        <h3>유저 소개</h3>
        <button className="doneBtn">친구추가</button>
      </div>
    </div>
  );
};

export default UserCard;
