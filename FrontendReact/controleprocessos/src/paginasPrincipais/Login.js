import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Importando o CSS
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../src/config/Config.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}:6543/api/login`, { email, senha });
      
      const { nome } = response.data; 
      navigate('/home', { state: { nome } }); 
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{width: '260px'}} className="input-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button style={{padding : '10px', marginTop: '-6px'}} type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div className="button-container">
          <button style={{padding : '10px', marginTop: '-25px'}} type="submit">Entrar</button>
          <button style={{padding : '10px'}} type="button">Esqueci minha senha</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
