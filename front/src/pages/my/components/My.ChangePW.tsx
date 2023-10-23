import React, { useState } from 'react';
import styles from '../styles/My.ChangePW.module.scss';
import { getEmail } from '../../../utils/localStorageHandlers';
import { instance } from '../../../api/instance';

interface ChangeDataType {
  email: string;
  password: string;
  passwordConfirm: string;
}

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!changeData.email) {
      alert('이메일을 입력해주세요');
      return;
    } else if (changeData.email !== getEmail) {
      alert('입력하신 이메일이 다릅니다.');
      setChangeData(CHANGE_DATA_INITIAL_DATA);
      return;
    }

    if (!changeData.password) {
      alert('비밀번호를 입력해주세요');
      setChangeData(CHANGE_DATA_INITIAL_DATA);
      return;
    } else if (changeData.password !== changeData.passwordConfirm) {
      alert('비밀번호를 다시입력해주세요');
      setChangeData(CHANGE_DATA_INITIAL_DATA);
      return;
    }

    try {
      await instance.post(`/users/reset-password`, {
        email: changeData.email,
        password: changeData.password,
      });
    } catch {
      console.error('비밀번호 변경 실패');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeData((prevData: ChangeDataType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="modal">
      <form className={styles.container} onSubmit={handleSubmit}>
        <label>이메일입력</label>
        <input
          name="email"
          value={changeData.email}
          onChange={handleInputChange}
        />
        <label>비밀번호 입력</label>
        <input
          type="password"
          name="password"
          value={changeData.password}
          onChange={handleInputChange}
        />
        <label>비밀번호 재입력</label>
        <input
          type="password"
          name="passwordConfirm"
          value={changeData.passwordConfirm}
          onChange={handleInputChange}
        />
        <div className={styles.btns}>
          <button type="submit" className="doneBtn">
            변경완료
          </button>
          <button
            type="button"
            className="cancelBtn"
            onClick={toggleIsOpenChangePW}
          >
            변경취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePW;
