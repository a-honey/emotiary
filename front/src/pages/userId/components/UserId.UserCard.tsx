import React from 'react';

import { handleImgError } from '../../../utils/imgHandlers';
import ImageComponent from '../../../components/ImageComponent';

const UserCard = () => {
  return (
    <div>
      <ImageComponent src={null} alt={`유저의 프로필사진`} />
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
