import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Menu from './components/Menu';
import Layout from './components/layout';

import './App.css'

const App = () => {
  return (
    <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center py-2 bg-gray-100' >
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/menu" element={<Menu />} />
              </Routes>
            </Layout>
          }
          />
      </Routes>
    </Router>
    </main>
  );
};

export default App;

