import React, { useState } from 'react';
import axios from 'axios';
import './adcProduto.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'


const AdcProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    categoria: '',
    quantidade: 0,
    preco: 0,
    dta: '',
    fornecedor: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleBack = () => {
    navigate('/estoque');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}:6543/api/produtos`, produto);
      console.log(response.data);
      navigate('/estoque');
    } catch (error) {
      console.error('Erro ao adicionar produto', error);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome do Produto" onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categoria" onChange={handleChange} required />
        <input type="number" name="quantidade" placeholder="Quantidade" onChange={handleChange} required />
        <input type="number" name="preco" placeholder="Preço" onChange={handleChange} required />
        <input type="date" name="dta" placeholder="Data" onChange={handleChange} required />
        <input type="text" name="fornecedor" placeholder="Fornecedor" onChange={handleChange} required />
        <button style={{ display: 'block',  marginLeft: '-188px' }} type="submit">Adicionar</button>
      </form>
      <BotaoVoltar destino="/estoque" />
    </div>
  );
};

export default AdcProduto;
