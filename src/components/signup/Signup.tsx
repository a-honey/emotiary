import React, { FormEvent, useState } from 'react';
import '../../styles/Signup.css';

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
            <label htmlFor="email"></label>
            <div className='inputGroup'>
              <i className='box1'></i>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='formGroup'>
            <label htmlFor="password"></label>
            <div className='inputGroup'>
              <i className='box2'></i>
              <input
                id="password"
                type="password"
                placeholder="패스워드를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className='formGroup'>
            <label htmlFor="confirmPassword"></label>
            <div className='inputGroup'>
              <i className='box2'></i>
              <input
                id="confirmPassword"
                type="password"
                placeholder="패스워드를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className='submitButton'>SIGN UP</button>
        </form>
      </div>
    </>
  );
}

export default Signup;