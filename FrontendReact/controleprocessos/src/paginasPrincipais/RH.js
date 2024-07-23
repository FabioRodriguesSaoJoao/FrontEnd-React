import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BotaoVoltar from '../components/voltar/BotaoVoltar.js';


const RH = () => {

    return (
      <div className="estoque-container">
        <h1>Gestão de Compras</h1>
        <div className="button-container">
          <Link to="/contratacao" className="button">Gestão de Contratação</Link>
        </div>
        <BotaoVoltar destino="/home" />
      </div>
    );
  

};

export default RH;