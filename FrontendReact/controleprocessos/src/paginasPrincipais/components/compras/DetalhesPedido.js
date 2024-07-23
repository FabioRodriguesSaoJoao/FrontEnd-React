import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './detalhesPedido.css';
import { useParams, useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import FormatarMoeda from '../../../components/dinheiroPT-BR/FormatarMoeda.js';
import DataHora from '../../../components/dataHora/DataHora.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const DetalhesPedido = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, [id]); 

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/pedidos/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Erro ao obter detalhes do pedido', error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}:6543/api/pedidos/${id}/status`, { status: newStatus });
      fetchOrderDetails();
      navigate('/listagemDePedidos'); 
    } catch (error) {
      console.error('Erro ao atualizar status do pedido', error);
    }
  };



  if (!order) return <div>Carregando...</div>;

  return (
    <div className="order-details-container">
      <h1>Detalhes do Pedido</h1>
      <p>Número do Pedido: {order.id}</p>
      <p>Data: <DataHora data={order.dta} /></p>
      <p>Cliente: {order.cliente}</p>
      <p>Endereço de Entrega: {order.endereco}</p>
      <h2>Itens do Pedido</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}> 
            {item.nome_produto} - Quantidade: {item.quantidade} - Preço: <FormatarMoeda valor={item.preco} />
          </li>
        ))}
      </ul>
      <p>Status Atual: {order.status}</p>
      <button onClick={() => handleStatusChange('Preparação')}>Preparação</button>
      <button onClick={() => handleStatusChange('Envio')}>Envio</button>
      <button onClick={() => handleStatusChange('Entregue')}>Entregue</button>
      <BotaoVoltar destino="/listagemDePedidos" />
    </div>
  );
};

export default DetalhesPedido;
