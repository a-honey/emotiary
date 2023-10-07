import React from 'react';

const DiaryReplyAdd = ({ handleIsAdding }: { handleIsAdding: () => void }) => {
  return (
    <div>
      <input placeholder={`${'usernam'}님에게 답글을 입력해주세요.`} />
    </div>
  );
};

export default DiaryReplyAdd;
