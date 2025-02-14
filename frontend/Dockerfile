# Dockerfile para Next.js com TypeScript
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Cria a build do Next.js
RUN npm run build

# Exponha a porta 3000 (porta padrão do Next.js)
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]
