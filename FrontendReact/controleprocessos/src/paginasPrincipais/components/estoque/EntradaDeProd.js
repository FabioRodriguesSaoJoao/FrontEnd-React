import React, { useState } from 'react';
import axios from 'axios';
import './entradaDeProd.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const EntradaDeProd = () => {
  const [entry, setEntry] = useState({
    productName: '',
    quantity: '',
    entryDate: '',
    supplier: '',
    invoice: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}:6543/api/entradas`, {
        produto_nome: entry.productName,
        quantidade: parseInt(entry.quantity, 10),
        data_entrada: entry.entryDate,
        fornecedor: entry.supplier,
        fatura: entry.invoice
      });
      console.log(response.data);
      navigate('/estoque');
    } catch (error) {
      console.error('Erro ao registrar entrada de produto', error);
    }
  };


  return (
    <div className="register-entry-container">
      <h1>Registrar Entrada de Produto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Nome do Produto" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantidade" onChange={handleChange} required />
        <input type="date" name="entryDate" placeholder="Data de Entrada" onChange={handleChange} required />
        <input type="text" name="supplier" placeholder="Fornecedor" onChange={handleChange} required />
        <input type="text" name="invoice" placeholder="Nota Fiscal" onChange={handleChange} required />
        <button type="submit">Registrar Entrada</button>
      </form>
      <BotaoVoltar destino="/estoque" />
    </div>
  );
};

export default EntradaDeProd;
