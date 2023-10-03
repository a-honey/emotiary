const Month = ({ currentMonth, handleNextMonth, handleBeforeMonth }) => {
  return (
    <div className="flex justify-center">
      <button onClick={handleBeforeMonth}>{'<'}</button>
      <div>{currentMonth}</div>
      <button onClick={handleNextMonth}>{'>'}</button>
    </div>
  );
};

export default Month;
