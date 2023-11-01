import React, { useState } from 'react';
import styles from '../styles/My.ChangePW.module.scss';
import { getEmail, logout } from '../../../utils/localStorageHandlers';
import { instance } from '../../../api/instance';
import { useNavigate } from 'react-router-dom';

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
  const navigator = useNavigate();
  const [changeData, setChangeData] = useState(CHANGE_DATA_INITIAL_DATA);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!changeData.email || !changeData.password) {
      alert('이메일을(비밀번호를) 입력해주세요');
      return;
    }

    if (
      changeData.email !== getEmail ||
      changeData.password !== changeData.passwordConfirm
    ) {
      alert('입력하신 이메일이(비밀번호가) 일치하지 않습니다');
      setChangeData(CHANGE_DATA_INITIAL_DATA);
      return;
    }

    try {
      await instance.post(`/users/reset-password`, {
        email: changeData.email,
        password: changeData.password,
      });
      alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
      navigator('/');
      logout();
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
