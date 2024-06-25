import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CadastrarMedico = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/medicos', { name });
      alert('Médico cadastrado com sucesso');
      setName('');
    } catch (error) {
      console.error('Erro ao cadastrar médico', error);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastrar Médico</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nome:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Cadastrar
          </button>
        </form>
        <button className='bg-black rounded p-2 content-center mt-5'>
            <Link className="flex  text-white hover:underline " to='/listar-medicos'>Listar Medicos</Link>
        </button>
      </div>
    </div>
  );
};

export default CadastrarMedico;
