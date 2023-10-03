import styles from './index.module.scss';

const FirstBox = () => {
  return (
    <section className={styles.block}>
      <div>프로젝트 설명</div>
      <div>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
    </section>
  );
};

export default FirstBox;
