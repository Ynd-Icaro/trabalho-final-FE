import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListarMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState('');
  const [editDoctor, setEditDoctor] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/medicos');
        setMedicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar médicos', error);
      }
    };

    fetchMedicos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/medicos/${id}`);
      setMedicos(medicos.filter(doctor => doctor.id !== id));
    } catch (error) {
      console.error('Erro ao excluir médico', error);
    }
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setName(doctor.name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/medicos/${editDoctor.id}`, {
        name
      });
      setMedicos(medicos.map(d => (d.id === editDoctor.id ? response.data : d)));
      setEditDoctor(null);
      setName('');
    } catch (error) {
      console.error('Erro ao atualizar médico', error);
    }
  };

  const filteredMedicos = medicos.filter(medico =>
    medico.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Médicos</h1>
          <button
            onClick={() => navigate('/cadastrar-medico')}
            className="py-2 px-4 ml-20 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Cadastrar Novo Médico
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar médico..."
          className="mb-4 p-2 border rounded w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul>
          {filteredMedicos.map(medico => (
            <li key={medico.id} className="py-2 px-4 border-b flex justify-between items-center">
              <span>{medico.name}</span>
              <div>
                <button
                  onClick={() => handleEdit(medico)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(medico.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editDoctor && (
          <form onSubmit={handleUpdate} className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Editar Médico</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nome:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Atualizar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ListarMedicos;
