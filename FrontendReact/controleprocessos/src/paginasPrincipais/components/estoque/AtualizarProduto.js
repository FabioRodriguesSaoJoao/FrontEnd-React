import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import './atualizarProduto.css';
import API_BASE_URL from '../../../../src/config/Config.js'

const AtualizarProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: '',
    categoria: '',
    quantidade: '',
    preco: '',
    fornecedor: '',
  });

  useEffect(() => {
    fetchProduto();
  }, []);

  const fetchProduto = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/estoque/${id}`);
      setProduto(response.data);
    } catch (error) {
      console.error('Erro ao obter produto', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}:6543/api/estoque/${id}`, produto);
      navigate('/visualizarEstoque');
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
    }
  };

  return (
    <div className="atualizar-produto-container">
      <h1>Atualizar Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          placeholder="Nome do Produto"
          required
        />
        <input
          type="text"
          name="categoria"
          value={produto.categoria}
          onChange={handleChange}
          placeholder="Categoria"
          required
        />
        <input
          type="number"
          name="quantidade"
          value={produto.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
          required
        />
        <input
          type="text"
          name="preco"
          value={produto.preco}
          onChange={handleChange}
          placeholder="Preço"
          required
        />
        <input
          type="text"
          name="fornecedor"
          value={produto.fornecedor}
          onChange={handleChange}
          placeholder="Fornecedor"
          required
        />
        <button type="submit">Atualizar</button>
      </form>
      <BotaoVoltar destino="/visualizarEstoque" />
    </div>
  );
};

export default AtualizarProduto;
