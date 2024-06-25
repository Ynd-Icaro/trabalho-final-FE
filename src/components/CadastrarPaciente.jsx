import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CadastrarPaciente = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/pacientes', { name, age, address });
      alert('Paciente cadastrado com sucesso');
      setName('');
      setAge('');
      setAddress('');
    } catch (error) {
      console.error('Erro ao cadastrar paciente', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastrar Paciente</h1>
        <form onSubmit={handleSubmit}>
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
            Cadastrar
          </button>
        </form>
        <button className='bg-black rounded p-2 content-center mt-5'>
            <Link className="flex  text-white hover:underline " to='/listar-pacientes'>Listar Pacientes</Link>
        </button>
      </div>
    </div>
  );
};

export default CadastrarPaciente;
