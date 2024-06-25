import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registrar';
import Menu from './components/Menu';
import Layout from './components/Layout';
import CadastrarPaciente from './components/CadastrarPaciente';
import CadastrarMedico from './components/CadastrarMedico';
import ListarPacientes from './components/ListarPaciente';
import ListarMedicos from './components/ListarMedicos';
import CadastrarConsulta from './components/CadastrarConsulta';
import ListarConsultas from './components/ListarConsulta';
import './App.css';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn === 'true' ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    
    <main className="w-full h-full text-center">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route path="menu" element={<ProtectedRoute element={<Menu />} />} />
            <Route path="cadastrar-paciente" element={<ProtectedRoute element={<CadastrarPaciente />} />} />
            <Route path="listar-pacientes" element={<ProtectedRoute element={<ListarPacientes />} />} />
            <Route path="listar-medicos" element={<ProtectedRoute element={<ListarMedicos />} />} />
            <Route path="cadastrar-medico" element={<ProtectedRoute element={<CadastrarMedico />} />} />
            <Route path="cadastrar-consulta" element={<ProtectedRoute element={<CadastrarConsulta />} />} />
            <Route path="listar-consultas" element={<ProtectedRoute element={<ListarConsultas />} />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
