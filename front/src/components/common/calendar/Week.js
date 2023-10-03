const Week = () => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <table className="w-full">
      <thead className="w-full">
        {/* 컴포넌트 내에서 요일을 매핑 */}
        <tr className="w-full flex justify-between">
          {week.map((el) => (
            <th key={el}>{el}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Week;
