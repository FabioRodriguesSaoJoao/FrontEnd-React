import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './relatoriosFinanceiros.css';
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import FormatarMoeda from '../../../components/dinheiroPT-BR/FormatarMoeda.js';
import DataHora from '../../../components/dataHora/DataHora.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const RelatoriosFinanceiros = () => {
  const [financialReports, setFinancialReports] = useState([]);

  useEffect(() => {
    fetchFinancialReports();
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/vendas');
  };

  const fetchFinancialReports = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/vendas/relatorios-financeiros`);
      setFinancialReports(response.data);
    } catch (error) {
      console.error('Erro ao obter relatórios financeiros', error);
    }
  };

  return (
    <div className="relatorios-financeiros-container">
      <h1>{financialReports.length === 0 ? 'Relatórios financeiros de valores vendidos sem dados' : 'Relatórios financeiros de valores vendidos'}</h1>
      {financialReports.length > 0 && (
        <> 
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor Vendido</th>
              </tr>
            </thead>
            <tbody>
              {financialReports.map((report) => (
                <tr key={report.dta}>
                  <td><DataHora data={report.dta} /></td>
                  <td><FormatarMoeda valor={report.totalvendas} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <BotaoVoltar destino="/vendas" />
    </div>
  );
};

export default RelatoriosFinanceiros;
