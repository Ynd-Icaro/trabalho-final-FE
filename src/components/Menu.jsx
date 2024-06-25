import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="flex flex-col mt-10 min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md max-w-3xl ">
        <h1 className="text-3xl font-bold mb-6 text-center">Menu Principal</h1>
        <nav className="flex flex-col space-y-4">
          <Link to="/cadastrar-paciente" className="py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            Cadastrar Paciente
          </Link>
          <Link to="/listar-pacientes" className="py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            Listar Pacientes
          </Link>
          <Link to="/cadastrar-medico" className="py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            Cadastrar Médico
          </Link>
          <Link to="/listar-medicos" className="py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            Listar Médicos
          </Link>
          <Link to="/cadastrar-consulta" className="py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            Cadastrar Consulta
          </Link>
          <Link to="/listar-consultas" className="py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
            Listar Consultas
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
