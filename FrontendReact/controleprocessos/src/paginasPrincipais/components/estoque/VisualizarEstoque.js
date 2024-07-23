import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './visualizarEstoque.css';
import { useNavigate } from 'react-router-dom';
import DataHora from '../../../components/dataHora/DataHora.js';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import FormatarMoeda from '../../../components/dinheiroPT-BR/FormatarMoeda.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const VisualizarEstoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [filters, setFilters] = useState({
    nome: '',
    data_inicio: '',
    data_fim: '',
    fornecedor: '',
  });
  const [movements, setMovements] = useState({ entries: [], exits: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/estoque`, { params: filters });
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao obter estoque', error);
    }
  };

  const fetchMovements = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/estoque/movimentacao`, { params: { data_inicio: filters.data_inicio, data_fim: filters.data_fim } });
      setMovements(response.data);
    } catch (error) {
      console.error('Erro ao obter movimentações de estoque', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`${API_BASE_URL}:6543/api/estoque/${productId}`);
        setProdutos(produtos.filter(produto => produto.id !== productId));
        alert('Produto excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir produto', error);
        alert('Erro ao excluir produto');
      }
    }
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/estoque/atualizar/${productId}`);
  };
  return (
    <div className="visualizar-estoque-container">
      <h1>Visualizar Estoque</h1>
      <div className="filters">
        <input type="text" name="nome" placeholder="Nome do Produto" onChange={handleChange} />
        <input type="date" name="data_inicio" placeholder="Data de Início" onChange={handleChange} className="small-input" />
        <input type="date" name="data_fim" placeholder="Data de Fim" onChange={handleChange} className="small-input" />
        <input type="text" name="fornecedor" placeholder="Fornecedor" onChange={handleChange} />
        <button onClick={fetchProducts}>Aplicar Filtros</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Data</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>{produto.quantidade}</td>
              <td><FormatarMoeda valor={produto.preco} /></td>
              <td><DataHora data={produto.dta} /></td>
              <td>{produto.fornecedor}</td>
              <td>
                <button onClick={() => handleUpdateProduct(produto.id)}>Atualizar</button>
                <button onClick={() => handleDeleteProduct(produto.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BotaoVoltar destino="/estoque" />
    </div>
  );
};

export default VisualizarEstoque;
