import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './historicoDeEstoque.css';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DataHora from '../../../components/dataHora/DataHora.js'; 
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'


const HistoricoDeEstoque = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/historico`);
      console.log('Dados do histórico:', response.data); // Adicione este log
      setHistory(response.data);
    } catch (error) {
      console.error('Erro ao obter histórico de estoque', error);
    }
  };


  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Data', 'Tipo', 'Nome do Produto', 'Quantidade', 'Responsável']],
      body: history.map(item => [item.data, item.tipo, item.nome, item.quantidade, item.responsavel]),
    });
    doc.save('historico_estoque.pdf');
  };

  return (
    <div className="historico-estoque-container">
      <h1>{history.length === 0 ? 'Histórico de Estoque sem dados' : 'Histórico de Estoque'}</h1>
      {history.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td><DataHora data={item.data} /></td>
                  <td>{item.tipo}</td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.responsavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="export-buttons">
            <CSVLink data={history} filename="historico_estoque.csv" className="csv-button">
              Exportar CSV
            </CSVLink>
            <button onClick={exportPDF} className="pdf-button">Exportar PDF</button>
          </div>
        </>
      )}
      <BotaoVoltar destino="/estoque" />
    </div>
  );
};

export default HistoricoDeEstoque;
