import React from 'react';

import { handleImgError } from '../../utils/handleImg';

const UserCard = () => {
  return (
    <div>
      <img src="" alt="의 프로필사진" onError={handleImgError} />
      <div>
        <h2>유저 이름</h2>
        <h3>반가워</h3>
        <h3>유저 소개</h3>
      </div>
    </div>
  );
};

export default UserCard;
