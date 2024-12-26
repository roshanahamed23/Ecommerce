import Footer from '@/components/building_block/Footer';
import Header from '@/components/building_block/Header';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
