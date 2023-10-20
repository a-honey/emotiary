import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/mystyle.css';
import './styles/global.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 데이터가 유효한 최대 시간
      cacheTime: 0, // 캐시된 데이터가 보존되는 최대 시간
      onError: (error) => {
        console.error('useQuery 에러 발생:', error);
      },
    },
  },
  queryCache: new QueryCache({
    onSuccess: () => {},
    onSettled: () => {},
    onError: (err, query) => {
      if (err?.meta?.eMessage) {
        console.log(`${query.queryKey} 에러`);
      }
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>,
);
