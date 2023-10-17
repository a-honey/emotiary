import React, { useState } from 'react';

const CHANGE_DATA_INITIAL_DATA = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const ChangePW = ({
  toggleIsOpenChangePW,
}: {
  toggleIsOpenChangePW: () => void;
}) => {
  const [changeData, setChangeData] = useState(CHANGE_DATA_INITIAL_DATA);

  const handleSubmit = () => {
    //e.preventDefault();

    if (!changeData.email) {
      alert('이메일을 확인해주세요');
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>이메일입력</label>
        <input />
        <label>비밀번호변경</label>
        <input />
        <label>비밀번호변경</label>
        <input />
        <div className="btns">
          <button type="submit">변경완료</button>
          <button type="button" onClick={toggleIsOpenChangePW}>
            변경취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePW;
