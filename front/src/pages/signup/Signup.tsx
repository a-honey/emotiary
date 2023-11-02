import React from 'react';
import Signup from './components/Signup.Signup';
import { withLoginSoNot } from '../../components/withLogin';

const SignupPage: React.FC = () => {
  return (
    <main style={{ height: '69vh' }}>
      <Signup></Signup>
    </main>
  );
};

export default withLoginSoNot(SignupPage);
