import React, { FormEvent, useState } from 'react';
import '../../styles/Signin.css';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('이메일:', email);
    console.log('패스워드:', password);
  };

  return (
    <>
      <div className='centerContainer'>
        <form onSubmit={handleSubmit} className='loginForm'>
          <div className='formGroup'>
            <label htmlFor="email">
            </label>
            <div className='inputGroup'>
              <i className='box1'></i>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='formGroup'>
            <label htmlFor="password">
            </label>
            <div className='inputGroup'>
              <i className='box2'></i>
              <input
                type="password"
                id="password"
                placeholder="패스워드를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className='submitButton'>SIGN IN</button>
        </form>
      </div>
    </>
  );
}

export default Signin;