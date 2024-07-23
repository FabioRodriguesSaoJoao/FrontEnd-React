import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gestaoRH.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../../src/config/Config.js'

const GestaoRH = () => {
  const [candidatos, setCandidatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const handleBack = () => {
    navigate('/rh');
  };

  const handleAddCandidate = () => {
    navigate('/cadastroCandidato');
  };

  const fetchCandidatos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}:6543/api/rh/candidatos`);
      setCandidatos(response.data);
    } catch (error) {
      console.error('Erro ao obter candidatos', error);
    }
  };

  const handleColumnStatusChange = async (candidateId, column, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}:6543/api/rh/candidatos/${candidateId}/${column}`, { status: newStatus });
      fetchCandidatos(); 
    } catch (error) {
      console.error(`Erro ao atualizar ${column}`, error);
    }
  };

  const toggleActiveStatus = async (candidateId, isActive) => {
    try {
      await axios.put(`${API_BASE_URL}:6543/api/rh/candidatos/${candidateId}/ativo`, { ativo: !isActive });
      fetchCandidatos(); 
    } catch (error) {
      console.error('Erro ao atualizar status de atividade do candidato', error);
    }
  };

  return (
    <div className="gestao-rh-container">
      <h1>{candidatos.length === 0 ? 'Gestão de RH - Linha do tempo de entrevistas sem dados' : 'Gestão de RH - Linha do tempo de entrevistas'}</h1>
      {candidatos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Ativo/Inativo</th>
              <th>Análise do Currículo</th>
              <th>Entrevista com RH</th>
              <th>Entrevista Técnica</th>
              <th>Proposta</th>
              <th>Contratação Concluída</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.nome}</td>
                <td>{candidate.funcao}</td>
                <td>
                  <button onClick={() => toggleActiveStatus(candidate.id, candidate.ativo)}>
                    {candidate.ativo ? 'Inativar' : 'Ativar'}
                  </button>
                  <span>{candidate.ativo ? 'Ativo' : 'Inativo'}</span>
                </td>
                <td>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'analise_curriculo', ' Aprovado')}>
                     Aprovado
                  </button>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'analise_curriculo', 'Reprovado')}>
                    Reprovado
                  </button>
                  <span>{candidate.analise_curriculo }</span>
                </td>
                <td>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'entrevista_rh', ' Aprovado')}>
                     Aprovado
                  </button>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'entrevista_rh', 'Reprovado')}>
                    Reprovado
                  </button>
                  <span>{candidate.entrevista_rh }</span>
                </td>
                <td>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'entrevista_tecnica', ' Aprovado')}>
                     Aprovado
                  </button>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'entrevista_tecnica', 'Reprovado')}>
                    Reprovado
                  </button>
                  <span>{candidate.entrevista_tecnica }</span>
                </td>
                <td>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'proposta', ' Aprovado')}>
                     Aprovado
                  </button>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'proposta', 'Reprovado')}>
                    Reprovado
                  </button>
                  <span>{candidate.proposta }</span>
                </td>
                <td>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'contratacao_concluida', ' Aprovado')}>
                     Aprovado
                  </button>
                  <button onClick={() => handleColumnStatusChange(candidate.id, 'contratacao_concluida', 'Reprovado')}>
                    Reprovado
                  </button>
                  <span>{candidate.contratacao_concluida }</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="add-candidate-button" onClick={handleAddCandidate}>Cadastrar Novo Candidato</button>
      <button className="back-button" onClick={handleBack}>Voltar</button>
    </div>
  );
};

export default GestaoRH;
