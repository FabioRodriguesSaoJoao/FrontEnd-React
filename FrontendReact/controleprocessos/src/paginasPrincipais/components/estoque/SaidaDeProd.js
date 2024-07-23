import React, { useState } from 'react';
import axios from 'axios';
import './saidaDeProd.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const SaidaDeProd = () => {
  const [exit, setExit] = useState({
    nome_produto: '', 
    quantidade: 0,
    data_saida: '', 
    recebedor: '', 
    razao: '', 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExit({ ...exit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}:6543/api/saidas`, exit);
      console.log(response.data);
      navigate('/estoque');
    } catch (error) {
      console.error('Erro ao registrar saída de produto', error);
    }
  };



  return (
    <div className="register-exit-container">
      <h1>Registrar Saída de Produto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="produto_nome" placeholder="Nome do Produto" onChange={handleChange} required />
        <input type="number" name="quantidade" placeholder="Quantidade" onChange={handleChange} required />
        <input type="date" name="data_saida" placeholder="Data de Saída" onChange={handleChange} required />
        <input type="text" name="recebedor" placeholder="Destinatário" onChange={handleChange} required />
        <input type="text" name="razao" placeholder="Motivo da Saída" onChange={handleChange} required />
        <button type="submit">Registrar Saída</button>
      </form>
      <BotaoVoltar destino="/estoque" />
    </div>
  );
};

export default SaidaDeProd;
