# Usar uma imagem base do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Build da aplicação para produção
RUN npm run build

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]