import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Menu from './components/Menu';
import Layout from './components/layout';

const App = () => {
  return (
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
                {/* Adicione outras rotas conforme necessário */}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
