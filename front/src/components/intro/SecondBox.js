import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';
import styles from './index.module.scss';

const SecondBox = () => {
  const isAnimated = useIsScrollAnimation(200);
  return (
    <section className={styles.white}>
      <div className={isAnimated ? styles.animation : ''}>프로젝트 이미지</div>
      <div>이미지</div>
    </section>
  );
};

export default SecondBox;
