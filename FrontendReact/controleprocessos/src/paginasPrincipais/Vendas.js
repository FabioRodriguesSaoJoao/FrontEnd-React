import React from 'react';
import { Link } from 'react-router-dom';
import BotaoVoltar from '../components/voltar/BotaoVoltar.js';

const Vendas = () => {

  return (
    <div className="estoque-container">
      <h1>Gestão de Vendas</h1>
      <div className="button-container">
        <Link to="/relatoriosVendas" className="button">Relatorios de Vendas</Link>
        <Link to="/tendenciasVendas" className="button">Tendencias de Vendas</Link>
        <Link to="/relatoriosFinanceiros" className="button">Relatorios de Financeiros</Link>
      </div>
      <BotaoVoltar destino="/home" />
    </div>
  );
};



  




export default Vendas;