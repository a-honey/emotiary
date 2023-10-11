
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import '../../styles/Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    const data = { email, password, confirmPassword };

    try {
      const response = await axios.post('http://localhost:3000/users/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('회원가입 성공', response.data);
    } catch (error) {
      console.log('회원가입 실패', error);
    }

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