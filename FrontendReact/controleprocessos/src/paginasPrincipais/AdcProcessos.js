import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adcProcessos.css';
import API_BASE_URL from './../config/Config.js';
import BotaoVoltar from '../components/voltar/BotaoVoltar';

const AdcProcessos = () => {
  const navigate = useNavigate();
  const [processName, setProcessName] = useState('');
  const [subProcesses, setSubProcesses] = useState(['', '']); 

  const handleProcessNameChange = (e) => {
    setProcessName(e.target.value);
  };

  const handleSubProcessChange = (index, value) => {
    const newSubProcesses = [...subProcesses];
    newSubProcesses[index] = value;
    setSubProcesses(newSubProcesses);
  };

  const handleAddSubProcess = () => {
    setSubProcesses([...subProcesses, '']);
  };

  const handleRemoveSubProcess = (index) => {
    if (subProcesses.length > 2) { 
      const newSubProcesses = subProcesses.filter((_, i) => i !== index);
      setSubProcesses(newSubProcesses);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedProcessName = processName.toLowerCase().replace(/\s+/g, '_');
    const newProcess = {
      processName,
      tableName: formattedProcessName,
      columns: subProcesses.map(col => col.toLowerCase().replace(/\s+/g, '_')),
    };

    try {
      await axios.post(`${API_BASE_URL}:6543/api/adcProcessos`, newProcess);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao adicionar novo processo', error);
    }
  };

  return (
    <div className="add-process-container">
      <div className="card-container">
        <h1>Adicionar Novo Processo</h1>
        <form className="add-process-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={processName}
            onChange={handleProcessNameChange}
            placeholder="Nome do novo processo"
            required
          />
          <div className="subprocess-container">
            {subProcesses.map((subProcess, index) => (
              <div key={index} className="subprocess-item">
                <input
                  type="text"
                  value={subProcess}
                  onChange={(e) => handleSubProcessChange(index, e.target.value)}
                  placeholder="Nome do subprocesso"
                  required
                />
                {subProcesses.length > 2 && (
                  <button type="button" onClick={() => handleRemoveSubProcess(index)}>Remover</button>
                )}
              </div>
            ))}
          </div>
          <div className="button-container">
            <button type="button" onClick={handleAddSubProcess} className="add-subprocess-button">Adicionar Subprocesso</button>
            <button type="submit" className="create-process-button">Criar Processo</button>
            <BotaoVoltar destino='/home' className="botao-voltar-button" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdcProcessos;
