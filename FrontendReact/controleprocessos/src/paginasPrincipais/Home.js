import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import API_BASE_URL from './../config/Config.js';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nome } = location.state || { nome: 'Usuário' };
  const [cards, setCards] = useState([
    { title: "Gestão de Estoque", path: "/estoque" },
    { title: "Processo de Compras", path: "/compras" },
    { title: "Processo de Vendas", path: "/vendas" },
    { title: "Gestão de Recursos Humanos (RH)", path: "/rh" },
  ]);

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}:6543/api/processes`);
        const newCards = response.data.map(process => ({
          title: process.title,
          path: `/${process.path}`
        }));

        // Atualizar o estado com os novos cards, removendo duplicatas
        setCards(prevCards => {
          const cardTitles = new Set(prevCards.map(card => card.title));
          const filteredNewCards = newCards.filter(card => !cardTitles.has(card.title));
          return [...prevCards, ...filteredNewCards];
        });
      } catch (error) {
        console.error('Erro ao buscar processos', error);
      }
    };

    fetchProcesses();
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleCreateProcess = () => {
    navigate('/adcProcessos');
  };
  const handleDeleteProcess = async (title) => {

    const titulo = title.replace(/\s+/g, '_');
    console.log(`Excluindo a tabela: ${titulo}`);
    
    try {
      await axios.delete(`${API_BASE_URL}:6543/api/processos/${titulo}`);
      setCards(prevCards => prevCards.filter(card => card.title !== title));
    } catch (error) {
      console.error('Erro ao excluir processo', error);
    }
  };
  
  

  return (
    <div className="home-container">
      <h1>Bem-vindo, {nome}!</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="create-process-button" onClick={handleCreateProcess}>Criar Novo Processo</button>
      <div className="card-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h2 onClick={() => handleCardClick(card.path)}>{card.title}</h2>
            <button className="delete-button" onClick={() => handleDeleteProcess(card.title)}>Excluir Processo</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
