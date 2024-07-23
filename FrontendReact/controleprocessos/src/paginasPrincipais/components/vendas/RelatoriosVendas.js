import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './relatoriosVendas.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import FormatarMoeda from '../../../components/dinheiroPT-BR/FormatarMoeda.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const RelatoriosVendas = () => {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [leastSoldProducts, setLeastSoldProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMostSoldProducts();
    fetchLeastSoldProducts();
  }, []);

  const fetchMostSoldProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/vendas/mais-vendidos`);
      setMostSoldProducts(response.data);
    } catch (error) {
      console.error('Erro ao obter produtos mais vendidos', error);
    }
  };

  const fetchLeastSoldProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/vendas/menos-vendidos`);
      setLeastSoldProducts(response.data);
    } catch (error) {
      console.error('Erro ao obter produtos menos vendidos', error);
    }
  };


  const renderTable = (products, title) => {
    return products.length > 0 ? (
      <div className="report-section">
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Vendidos</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.nome}</td>
                <td><FormatarMoeda valor={product.sold} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Ainda não existe o relatório de vendas</p>
    );
  };

  return (
    <div className="relatorios-vendas-container">
      <h1>Relatórios de Vendas</h1>
      <div className="report-sections-container">
        {renderTable(mostSoldProducts, 'Produtos Mais Vendidos')}
        {renderTable(leastSoldProducts, 'Produtos Menos Vendidos')}
      </div>
      <BotaoVoltar destino="/vendas" />
    </div>
  );
};

export default RelatoriosVendas;
