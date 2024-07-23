import React, { useState } from 'react';
import axios from 'axios';
import './cadastroCandidato.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../../src/config/Config.js'

const CadastroCandidato = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Ativo');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}:6543/api/rh/candidatos`, { nome: name, funcao: role, status });
      navigate('/contratacao');
    } catch (error) {
      console.error('Erro ao cadastrar candidato', error);
    }
  };

  const handleBack = () => {
    navigate('/contratacao');
  };

  return (
    <div className="cadastro-candidato-container">
      <h2>Cadastrar Novo Candidato</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Candidato</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Função</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={handleBack}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroCandidato;
