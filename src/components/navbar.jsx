import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Menu">Menu</Link>
        </li>
        <li>
          <Link to="/login">Acessar</Link>
        </li>
        {/* Adicione outros links conforme necessário */}
      </ul>
    </nav>
  );
};

export default Navbar;
