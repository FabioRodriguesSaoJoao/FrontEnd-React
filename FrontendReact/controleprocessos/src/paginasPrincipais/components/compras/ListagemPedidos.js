import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listagemPedidos.css';
import { useNavigate } from 'react-router-dom';
import DataHora from '../../../components/dataHora/DataHora.js'; 
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const ListagemPedidos = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/pedidos`);
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao obter pedidos', error);
    }
  };

  const handleViewDetails = (orderId) => {
    navigate(`/detalhesPedido/${orderId}`);
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await axios.delete(`${API_BASE_URL}:6543/api/pedidos/${orderId}`);
        setOrders(orders.filter(order => order.id !== orderId));
        alert('Pedido excluído com sucesso');
      } catch (error) {
        console.error('Erro ao excluir pedido', error);
        alert('Erro ao excluir pedido');
      }
    }
  };

  return (
    <div className="orders-container">
      <h1>{orders.length === 0 ? 'Lista de Pedidos sem dados' : 'Lista de Pedidos'}</h1>
      {orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Número do Pedido</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td><DataHora data={order.dta} /></td>
                <td>{order.cliente}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleViewDetails(order.id)}>Ver Detalhes</button>
                  <button onClick={() => handleDeleteOrder(order.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <BotaoVoltar destino="/compras" />
    </div>
  );
};

export default ListagemPedidos;
