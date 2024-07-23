import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './DataHora.css'; 

const DataHora = ({ data }) => {
  const formattedDate = format(parseISO(data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  return <span className="data-hora">{formattedDate}</span>;
};

export default DataHora;
