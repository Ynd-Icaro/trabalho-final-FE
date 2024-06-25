import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [editPatient, setEditPatient] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pacientes');
        setPacientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pacientes', error);
      }
    };

    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pacientes/${id}`);
      setPacientes(pacientes.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Erro ao excluir paciente', error);
    }
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setName(patient.name);
    setAge(patient.age);
    setAddress(patient.address);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/pacientes/${editPatient.id}`, {
        name,
        age,
        address
      });
      setPacientes(pacientes.map(p => (p.id === editPatient.id ? response.data : p)));
      setEditPatient(null);
      setName('');
      setAge('');
      setAddress('');
    } catch (error) {
      console.error('Erro ao atualizar paciente', error);
    }
  };

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <button
            onClick={() => navigate('/cadastrar-paciente')}
            className="py-2 ml-20 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Cadastrar Novo Paciente
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar paciente..."
          className="mb-4 p-2 border rounded w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul>
          {filteredPacientes.map(paciente => (
            <li key={paciente.id} className="py-2 px-4 border-b flex justify-between items-center">
              <span>{paciente.name} - {paciente.age} anos - {paciente.address}</span>
              <div>
                <button
                  onClick={() => handleEdit(paciente)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(paciente.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editPatient && (
          <form onSubmit={handleUpdate} className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Editar Paciente</h2>
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Idade:</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Endereço:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

export default ListarPacientes;
