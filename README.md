Controle de Processos Frontend

Este é o frontend do projeto Controle de Processos, desenvolvido em React. Ele se conecta ao backend em Node.js para formar a aplicação completa.

Pré-requisitos
Docker e Docker Compose instalados
Node.js instalado (opcional, caso queira rodar a aplicação sem Docker)

Estrutura do Projeto
src/components: Contém os componentes React utilizados na aplicação.
src/pages: Contém as páginas principais da aplicação.
src/App.js: Arquivo principal que define as rotas e a estrutura geral da aplicação.

Configuração e Execução
Usando Docker
Para rodar a aplicação utilizando Docker, siga os passos abaixo:

Clone o repositório:
git clone https://github.com/usuario/repositorio-frontend.git

Navegue até o diretório do frontend:
cd FrontendReact/controleprocessos

Construa e inicie os containers Docker:
docker-compose up --build
A aplicação estará rodando e acessível na porta 3000 do seu localhost.

Usando Node.js (sem Docker)
Clone o repositório:
git clone https://github.com/usuario/repositorio-frontend.git

Navegue até o diretório do frontend:
cd FrontendReact/controleprocessos

Instale as dependências:
npm install

Inicie a aplicação:
npm start
A aplicação estará rodando e acessível na porta 3000 do seu localhost.

Conexão com o Backend
A aplicação React se conecta ao backend Node.js para consumir APIs e exibir dados. Certifique-se de que o backend esteja rodando e acessível na porta 6543.

Estrutura dos Componentes
Os componentes da aplicação estão organizados no diretório src/components. Cada componente é responsável por uma parte específica da interface do usuário. Exemplos de componentes incluem:

Header: Componente de cabeçalho da aplicação.
Footer: Componente de rodapé da aplicação.
ProcessList: Componente que exibe a lista de processos.

Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Contato
Para mais informações, entre em contato com sjrodrigues.fabio@gmail.com.
