import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import NetworkPage from './pages/NetworkPage';
import UserIdPage from './pages/UserIdPage';
import MyPage from './pages/MyPage';

const App = () => {
  return (
    <Routes>
      <Route path="/intro" exact element={<IntroPage />} />
      <Route path="/" exact element={<MainPage />} />
      <Route path="/network" exact element={<NetworkPage />} />
      <Route path="/users" exact element={<MainPage />} />
      <Route path="/user/:id" exact element={<UserIdPage />} />
      <Route path="/mypage" exact element={<MyPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default App;
