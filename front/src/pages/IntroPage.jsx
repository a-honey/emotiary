import FifthBox from '../components/intro/FifthBox';
import FirstBox from '../components/intro/FirstBox';
import FourthBox from '../components/intro/FourthBox';
import SecondBox from '../components/intro/SecondBox';
import ThirdBox from '../components/intro/ThidBox';

const IntroPage = () => {
  return (
    <main
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
    </main>
  );
};

export default IntroPage;
