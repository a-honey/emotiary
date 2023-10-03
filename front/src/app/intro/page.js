import FirstBox from '@/components/intro/FirstBox';
import SecondBox from '@/components/intro/SecondBox';
import ThirdBox from '@/components/intro/ThidBox';

const Intro = () => {
  const layoutStyle = 'w-full h-96 flex justify-center items-center"';
  return (
    <main className="flex flex-col">
      <FirstBox layout={layoutStyle} />
      <SecondBox layout={layoutStyle} />
      <ThirdBox layout={layoutStyle} />
    </main>
  );
};

export default Intro;
