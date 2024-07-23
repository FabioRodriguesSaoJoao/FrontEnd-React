import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/paginasPrincipais/Login';
import Home from '../src/paginasPrincipais/Home';
import Estoque from '../src/paginasPrincipais/Estoque'; 
import Compras from '../src/paginasPrincipais/Compras'; 
import Vendas from '../src/paginasPrincipais/Vendas'; 
import RH from '../src/paginasPrincipais/RH'; 
import AddProduct from './paginasPrincipais/components/estoque/AdcProduto'
import EntradaDeProd from './paginasPrincipais/components/estoque/EntradaDeProd';
import SaidaDeProd from './paginasPrincipais/components/estoque/SaidaDeProd';
import VisualizarEstoque from './paginasPrincipais/components/estoque/VisualizarEstoque'
import Historico from './paginasPrincipais/components/estoque/Historico';
import CadastrarPedido from './paginasPrincipais/components/compras/CadastrarPedido';
import DetalhesPedido from './paginasPrincipais/components/compras/DetalhesPedido';
import ListagemPedidos from './paginasPrincipais/components/compras/ListagemPedidos';
import RelatoriosVendas from './paginasPrincipais/components/vendas/RelatoriosVendas';
import TendenciasVendas from './paginasPrincipais/components/vendas/TendenciasVendas';
import RelatoriosFinanceiros from './paginasPrincipais/components/vendas/RelatoriosFinanceiros';
import GestaoRH from './paginasPrincipais/components/contratacaoRH/GestaoRh';
import CadastroCandidato from './paginasPrincipais/components/contratacaoRH/CadastroCandidato';
import AtualizarProduto from './paginasPrincipais/components/estoque/AtualizarProduto';
import AdcProcessos from './paginasPrincipais/AdcProcessos';
import ProcessosNovos from './paginasPrincipais/ProcessosNovos'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adcProcessos" element={<AdcProcessos />} />
        <Route path="/:processosNome" element={<ProcessosNovos />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/adcProduto" element={<AddProduct />} />
        <Route path="/entradaprodutos" element={<EntradaDeProd />} />
        <Route path="/registroSaida" element={<SaidaDeProd />} />
        <Route path="/visualizarEstoque" element={<VisualizarEstoque />} />
        <Route path="/estoque/atualizar/:id" element={<AtualizarProduto/>}/>
        <Route path="/historicoEstoque" element={<Historico />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/novoPedido" element={<CadastrarPedido />} />
        <Route path="/detalhesPedido/:id" element={<DetalhesPedido />} />
        <Route path="/listagemDePedidos" element={<ListagemPedidos />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/relatoriosVendas" element={<RelatoriosVendas />} />
        <Route path="/tendenciasVendas" element={<TendenciasVendas />} />
        <Route path="/relatoriosFinanceiros" element={<RelatoriosFinanceiros />} />
        <Route path="/rh" element={<RH />} />
        <Route path="/contratacao" element={<GestaoRH />} />
        <Route path="/cadastroCandidato" element={<CadastroCandidato />} />
      </Routes>
    </Router>
  );
};

export default App;
