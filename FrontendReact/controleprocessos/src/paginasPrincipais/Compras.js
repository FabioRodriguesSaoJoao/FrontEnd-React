import React from 'react';
import { Link } from 'react-router-dom';
import './estoque.css';
import BotaoVoltar from '../components/voltar/BotaoVoltar.js';



const Compras = () => {

    return (
      <div className="estoque-container">
        <h1>Gestão de Compras</h1>
        <div className="button-container">
          <Link to="/novoPedido" className="button">Fazer novo pedido</Link>
          <Link to="/listagemDePedidos" className="button">Listagem de pedidos</Link>
        </div>
        <BotaoVoltar destino="/home" />
      </div>
    );
  };
  

export default Compras;

