import React from 'react';
import FifthBox from '../components/intro/FifthBox';
import FirstBox from '../components/intro/FirstBox';
import FourthBox from '../components/intro/FourthBox';
import SecondBox from '../components/intro/SecondBox';
import ThirdBox from '../components/intro/ThirdBox';

const IntroPage: React.FC = () => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FirstBox />
      <SecondBox />
      <ThirdBox />
      <FourthBox />
      <FifthBox />
    </section>
  );
};

export default IntroPage;
