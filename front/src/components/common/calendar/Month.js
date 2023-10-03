import styles from './index.module.scss';

const Month = ({ currentMonth, handleNextMonth, handleBeforeMonth }) => {
  return (
    <div className={styles.monthBlock}>
      <button onClick={handleBeforeMonth}>{'<'}</button>
      <div>{currentMonth}</div>
      <button onClick={handleNextMonth}>{'>'}</button>
    </div>
  );
};

export default Month;
