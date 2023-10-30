import React, { ReactNode } from 'react';
import Signup from './components/Signup.Signup';
import { withLoginSoNot } from '../../components/withLogin';

const SignupPage: React.FC = () => {
  return (
    <main style={{ height: '74.5vh' }}>
      <Signup></Signup>
    </main>
  );
};

export default withLoginSoNot(SignupPage);
