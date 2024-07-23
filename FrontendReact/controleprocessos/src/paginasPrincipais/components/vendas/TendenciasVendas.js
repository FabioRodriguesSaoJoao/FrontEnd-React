import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tendenciasVendas.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Importar a função format
import ptBR from 'date-fns/locale/pt-BR'; //
import BotaoVoltar from '../../../components/voltar/BotaoVoltar.js';
import API_BASE_URL from '../../../../src/config/Config.js'

const TendenciasVendas = () => {
  const [salesData, setSalesData] = useState({ daily: [], weekly: [], monthly: [] });
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/vendas/tendencias`);
      setSalesData(response.data);
    } catch (error) {
      console.error('Erro ao obter dados de vendas', error);
    }
  };


  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  // Formata as datas para o gráfico
  const chartLabels = salesData[selectedPeriod].map((data) =>
    format(new Date(data.date), 'dd/MM/yyyy') // Formatação da data
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Vendas',
        data: salesData[selectedPeriod].map((data) => data.sales),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="tendencias-vendas-container">
      <h1>Tendências de Vendas</h1>
      <select onChange={handlePeriodChange} value={selectedPeriod}>
        <option value="daily">Diário</option>
        <option value="weekly">Semanal</option>
        <option value="monthly">Mensal</option>
      </select>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <BotaoVoltar destino="/vendas" />
    </div>
  );
};

export default TendenciasVendas;
