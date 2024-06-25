import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-list">
          {isLoggedIn && (
            <>
              <li className="navbar-item">
                <button onClick={() => toggleDropdown('paciente')} className="navbar-link">
                  Paciente
                </button>
                {dropdownOpen === 'paciente' && (
                  <ul className="dropdown">
                    <li><Link to="/cadastrar-paciente" className="dropdown-link">Cadastrar Paciente</Link></li>
                    <li><Link to="/listar-pacientes" className="dropdown-link">Listar Pacientes</Link></li>
                  </ul>
                )}
              </li>
              <li className="navbar-item">
                <button onClick={() => toggleDropdown('medico')} className="navbar-link">
                  Médico
                </button>
                {dropdownOpen === 'medico' && (
                  <ul className="dropdown">
                    <li><Link to="/cadastrar-medico" className="dropdown-link">Cadastrar Médico</Link></li>
                    <li><Link to="/listar-medicos" className="dropdown-link">Listar Médicos</Link></li>
                  </ul>
                )}
              </li>
              <li className="navbar-item">
                <button onClick={() => toggleDropdown('consulta')} className="navbar-link">
                  Consulta
                </button>
                {dropdownOpen === 'consulta' && (
                  <ul className="dropdown">
                    <li><Link to="/cadastrar-consulta" className="dropdown-link">Cadastrar Consulta</Link></li>
                    <li><Link to="/listar-consultas" className="dropdown-link">Listar Consultas</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={handleLogout} className="navbar-link">Logout</button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">Registrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
