import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from './../config/Config.js';
import './ProcessosNovo.css';
import BotaoVoltar from '../components/voltar/BotaoVoltar.js';

const ProcessosNovo = () => {
  const { processosNome } = useParams();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [newRowData, setNewRowData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchColumnsAndData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}:6543/api/${processosNome}`);
        setColumns(response.data.columns || []);
        
        const dataResponse = await axios.get(`${API_BASE_URL}:6543/api/${processosNome}/data`);
        setData(dataResponse.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados e colunas', error);
      }
    };

    fetchColumnsAndData();
  }, [processosNome]);

  const handleAddRow = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}:6543/api/${processosNome}`, newRowData);
      const dataResponse = await axios.get(`${API_BASE_URL}:6543/api/${processosNome}/data`);
      setData(dataResponse.data || []);
      setShowForm(false);
      setNewRowData({});
    } catch (error) {
      console.error('Erro ao adicionar nova linha', error.response?.data || error.message);
    }
  };

  return (
    <div className="process-page-container">
      <h1>{processosNome.replace(/_/g, ' ')}</h1>
      <div  className="card-container">
        <div style={{width: '600px'}} className="card-content">
          <table className="process-table">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          <button className="add-row-button" onClick={handleAddRow}>Adicionar Informações</button>
          <div style={{marginLeft: '5px'}}>
          <BotaoVoltar destino={'/home'}/>
          </div>
        </div>
        {showForm && (
          <div className="form-container">
            <form className="add-row-form" onSubmit={handleSubmit}>
              {columns.map((col, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={col}>{col.replace(/_/g, ' ')}</label>
                  <input
                    type="text"
                    id={col}
                    name={col}
                    value={newRowData[col] || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <button type="submit">Adicionar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessosNovo;
