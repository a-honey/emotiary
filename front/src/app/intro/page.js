import Footer from '@/components/common/Footer';
import FifthBox from '@/components/intro/FifthBox';
import FirstBox from '@/components/intro/FirstBox';
import FourthBox from '@/components/intro/FourthBox';
import SecondBox from '@/components/intro/SecondBox';
import ThirdBox from '@/components/intro/ThidBox';

const Intro = () => {
  const layoutStyle = 'w-full h-96 flex justify-center items-center gap-3.5';
  return (
    <>
      <main className="flex flex-col">
        <FirstBox layout={layoutStyle} />
        <SecondBox layout={layoutStyle} />
        <ThirdBox layout={layoutStyle} />
        <FourthBox layout={layoutStyle} />
        <FifthBox layout={layoutStyle} />
      </main>
      <Footer />
    </>
  );
};

export default Intro;
