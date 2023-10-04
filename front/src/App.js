import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import NetworkPage from './pages/UsersPage';

const App = () => {
  return (
    <Routes>
      <Route path="/intro" exact element={<IntroPage />} />
      <Route path="/" exact element={<MainPage />} />
      <Route path="/network" exact element={<NetworkPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default App;
