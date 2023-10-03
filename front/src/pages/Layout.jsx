import React from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
