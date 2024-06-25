import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', { email, password });
      if (response.status === 201) {
        alert('Registro feito com sucesso');
        navigate('/login');
      } else {
        setError('Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao efetuar registro', error);
      setError('Erro ao efetuar registro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form className='bg-white p-8 rounded shadow-md' onSubmit={handleSubmit}>
        <Link to="/" className='link-button'>Voltar para Home</Link>
        <h2 className='text-3xl font-bold mb-6 text-center'>Registrar</h2>
        {error && <p className='mb-4 text-red-500'>{error}</p>}
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Email:</label>
          <input type="email" className='w-full px-4 py-2 border rounded' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Senha:</label>
          <input type="password" className='w-full px-4 py-2 border rounded' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className='w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Registrar</button>
        <p className='mt-4 text-center'>
          Já tem uma conta? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
