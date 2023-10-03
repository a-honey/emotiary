import Link from 'next/link';

const FifthBox = ({ layout }) => {
  return (
    <section className={`${layout}`}>
      <div>프로젝트 설명</div>
      <div>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
      <Link href="/login">로그인</Link>
      <Link href="/register">회원가입</Link>
    </section>
  );
};

export default FifthBox;
