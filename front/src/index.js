import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/mystyle.css';
import './styles/global.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Layout>
          <App />
        </Layout>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);
