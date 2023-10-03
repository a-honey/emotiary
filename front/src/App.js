import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';

const App = () => {
  return (
    <Routes>
      <Route path="/intro" exact element={<IntroPage />} />
      <Route path="/" exact element={<MainPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default App;
