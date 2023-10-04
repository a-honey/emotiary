import React, { ReactNode } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
