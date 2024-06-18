import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', { email, password });
      if (response.status === 201) {
        alert('Registro feito com sucesso');
        navigate('/login');
      } else {
        alert('Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro ao efetuar Registro', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <button> <Link to='/'> Voltar</Link></button>
      <h2>Registrar</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Registrar</button>
      <p>
        Já tem uma conta? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
