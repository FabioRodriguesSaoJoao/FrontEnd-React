import React, { useState } from 'react';
import axios from 'axios';
import './cadastrarPedido.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const CadastrarPedido = () => {
  const [order, setOrder] = useState({
    client: '',
    deliveryAddress: '',
    items: [{ productName: '', quantity: '', price: '' }],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...order.items];
    items[index][name] = value;
    setOrder({ ...order, items });
  };

  const addItem = () => {
    setOrder({
      ...order,
      items: [...order.items, { productName: '', quantity: '', price: '' }],
    });
  };

  const removeItem = (index) => {
    const items = order.items.filter((_, i) => i !== index);
    setOrder({ ...order, items });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}:6543/api/pedidos`, {
        cliente: order.client,
        endereco: order.deliveryAddress,
        items: order.items.map(item => ({
          nome_produto: item.productName,
          quantidade: parseInt(item.quantity, 10),
          preco: parseFloat(item.price),
        })),
      });
      navigate('/compras');
    } catch (error) {
      console.error('Erro ao cadastrar pedido', error);
    }
  };


  return (
    <div className="cadastrar-pedido-container">
      <h1>Cadastrar Novo Pedido</h1>
      <form onSubmit={handleSubmit}>
        <label>Cliente:</label>
        <input type="text" name="client" value={order.client} onChange={handleChange} required />

        <label>Endereço de Entrega:</label>
        <input type="text" name="deliveryAddress" value={order.deliveryAddress} onChange={handleChange} required />

        <h2>Itens do Pedido</h2>
        {order.items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="text"
              name="productName"
              placeholder="Nome do Produto"
              value={item.productName}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantidade"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            
            <input
              type="number"
              name="price"
              placeholder="Preço"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              required
            />
            <button type="button" onClick={() => removeItem(index)}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Adicionar Item</button>
        <button type="submit">Cadastrar Pedido</button>
        <BotaoVoltar destino="/compras" />
      </form>
    </div>
  );
};

export default CadastrarPedido;
