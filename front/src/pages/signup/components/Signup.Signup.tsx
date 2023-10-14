import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

const Signup: React.FC = () => {

  const USER_INFOS = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [userInfo, setUserInfo] = useState<{ username: string, email: string, password: string, confirmPassword: string }>(USER_INFOS);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await instance.post('http://localhost:5001/users/register', userInfo);
      console.log('회원가입 성공', response.data);

      // 로그인 경로로 이동
      navigate('/signin');
    } catch (error) {
      alert(`${error} 에러 발생.`);
      console.log('회원가입 실패', error);
    }
  };

  return (
    <>
      <div className={styles.centerContainer}>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box1}></i>
              <input
                id="username"
                name="username" // 추가됨
                type="text"
                placeholder="이름을 한글/영어로만 입력하세요"
                value={userInfo.username}
                onChange={handleChange} // 수정됨
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box1}></i>
              <input
                id="email"
                name="email" // 추가됨
                type="email"
                placeholder="이메일을 입력하세요"
                value={userInfo.email}
                onChange={handleChange} // 수정됨
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box2}></i>
              <input
                id="password"
                name="password" // 추가됨
                type="password"
                placeholder="패스워드를 입력하세요"
                value={userInfo.password}
                onChange={handleChange} // 수정됨
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box2}></i>
              <input
                id="confirmPassword"
                name="confirmPassword" // 추가됨
                type="password"
                placeholder="패스워드를 다시 입력하세요"
                value={userInfo.confirmPassword}
                onChange={handleChange} // 수정됨
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>SIGN UP</button>
        </form>
      </div>
    </>
  );
}

export default Signup;



// import React, { FormEvent, useState } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';
// import '../../styles/Signup.css';

// // 회원가입 API 호출
// const signupUser = async ({ email, password }: { email: string; password: string }) => {
//   const response = await axios.post('http://example.com/api/signup', { email, password });
//   return response.data;
// };

// const Signup: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const queryClient = useQueryClient();
  
//   const mutation = useMutation(signupUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('someQueryKey'); // 성공시 캐시 무효화
//     },
//   });

//   const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert('패스워드가 일치하지 않습니다.');
//       return;
//     }

//     mutation.mutate({ email, password });
//   };

//   return (
//     <>
//       <div className='centerContainer'>
//         <form onSubmit={handleSubmit} className='signupForm'>
//           <div className='formGroup'>
//             <label htmlFor="email"></label>
//             <div className='inputGroup'>
//               <i className='box1'></i>
//               <input
//                 id="email"
//                 type="email"
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
//                 id="password"
//                 type="password"
//                 placeholder="패스워드를 입력하세요"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className='formGroup'>
//             <label htmlFor="confirmPassword"></label>
//             <div className='inputGroup'>
//               <i className='box2'></i>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="패스워드를 다시 입력하세요"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <button type="submit" className='submitButton'>SIGN UP</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Signup;