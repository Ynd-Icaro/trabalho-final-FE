import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        alert('Login feito com sucesso');
        navigate('/menu');
      } else {
        alert('Credenciais invalidas');
      }
    } catch (error) {
      console.error('Erro ao efetuar Login', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="back-button">
        <button type="button"> <Link to='/'>Voltar</Link></button>
      </div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
      <p>
        Não tem uma conta? <Link to="/register">Registrar</Link>
      </p>
    </form>
  );
};

export default Login;
