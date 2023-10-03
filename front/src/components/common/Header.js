const { default: Link } = require('next/link');

const Header = () => {
  return (
    <header className="w-full h-5vh fixed top-0 right-0 left-0 flex flex-row justify-between items-center px-20 bg-white font-bold">
      <div>앱 이름</div>
      <nav className="flex flex-row justify-between gap-3.5">
        <Link href="/main">MY CALEANDAR</Link>
        <Link href="/network">LATEST DIARY</Link>
        <Link href="/users">ALL USERS</Link>
        <Link href="/analysis">ANALYSIS</Link>
      </nav>
      <div className="flex flex-row justify-between gap-3.5">
        <Link href="/login">LOGIN</Link>
        <Link href="/register">REGISTER</Link>
      </div>
    </header>
  );
};

export default Header;
