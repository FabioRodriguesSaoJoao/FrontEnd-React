import React from 'react';
import { Link } from 'react-router-dom';
import './estoque.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../components/voltar/BotaoVoltar.js';

const Estoque = () => {
  return (
    <div className="estoque-container">
      <h1>Controle de Estoque</h1>
      <div className="button-container">
        <Link to="/adcProduto" className="button">Adicionar Produto</Link>
        <Link to="/entradaProdutos" className="button">Registrar Entrada</Link>
        <Link to="/registroSaida" className="button">Registrar Saída</Link>
        <Link to="/visualizarEstoque" className="button">Visualizar Estoque</Link>
        <Link to="/historicoEstoque" className="button">Histórico de Movimentações</Link>
      </div>
      <BotaoVoltar destino="/home" />
    </div>
  );
};

export default Estoque;
