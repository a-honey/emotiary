import React, { FormEvent, useState } from 'react';
// import './styles';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 정보', { email, password });
  };

  return (
    <>
      <div className='centerContainer'>
        <form onSubmit={handleSubmit} className='signupForm'>
          <div className='formGroup'>
            <label htmlFor="email">이메일: </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor="password">패스워드: </label>
            <input
              id="password"
              type="password"
              placeholder="패스워드를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='formGroup'>
            <label htmlFor="confirmPassword">패스워드 확인: </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="패스워드를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className='submitButton'>회원가입</button>
        </form>
      </div>
    </>
  );
}

export default Signup;