
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BotaoVoltar.css'; 

const BotaoVoltar = ({ destino }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(destino);
  };

  return (
    <button className="back-button" onClick={handleBack}>
      Voltar
    </button>
  );
};

export default BotaoVoltar;
