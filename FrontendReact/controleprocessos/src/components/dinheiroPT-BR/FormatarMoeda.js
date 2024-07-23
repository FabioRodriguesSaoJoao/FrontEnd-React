
import React from 'react';

const FormatarMoeda = ({ valor }) => {
  const formatarValor = (valor) => {

    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return <span>{formatarValor(valor)}</span>;
};

export default FormatarMoeda;

