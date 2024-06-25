/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4 mt-16 mb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
