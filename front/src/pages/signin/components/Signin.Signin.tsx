import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await instance.post('http://localhost:5001/users/login', data);
      console.log('로그인 성공!', response.data);

      // 로컬 스토리지에 로그인 성공값을 저장
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('token', response.data.token);

      // 메인 경로로 이동
      navigate('/');
    } catch (error) {
      console.log('로그인 실패!', error);
    }
  };

  return (
    <>
      <div className={styles.centerContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box1}></i>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box2}></i>
              <input
                type="password"
                id="password"
                placeholder="패스워드를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>SIGN IN</button>
        </form>
      </div>
    </>
  );
};

export default Signin;

// 비밀번호 분실
// /users/forgot-password

// 비밀번호 재설정
// /users/reset-password

// 로그아웃
// /users/logout

// 네이버 로그인
// /users/auth/google


// import React, { FormEvent, useState } from 'react';
// import { useMutation } from 'react-query';
// import '../../styles/Signin.css';

// type LoginData = {
//   email: string;
//   password: string;
// };

// const Signin: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

//   const mutation = useMutation((newTodo: LoginData) => fetch('/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newTodo),
//   }));

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // 서버로 보낼 데이터
//     const data = { email, password };

//     // React Query를 사용해 데이터를 전송
//     mutation.mutate(data, {
//       onSuccess: () => {
//         // 성공시 작업
//         console.log("로그인 성공!");
//       },
//       onError: () => {
//         // 실패시 작업
//         console.log("로그인 실패!");
//       },
//     });
//   };

//   return (
//     <>
//       <div className='centerContainer'>
//         <form onSubmit={handleSubmit} className='loginForm'>
//           <div className='formGroup'>
//             <label htmlFor="email"></label>
//             <div className='inputGroup'>
//               <i className='box1'></i>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="이메일을 입력하세요"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className='formGroup'>
//             <label htmlFor="password"></label>
//             <div className='inputGroup'>
//               <i className='box2'></i>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="패스워드를 입력하세요"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <button type="submit" className='submitButton'>SIGN IN</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Signin;