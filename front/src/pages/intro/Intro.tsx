import React from 'react';
import FifthBox from './components/Intro.FifthBox';
import FirstBox from './components/Intro.FirstBox';
import FourthBox from './components/Intro.FourthBox';
import SecondBox from './components/Intro.SecondBox';
import ThirdBox from './components/Intro.ThirdBox';

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
