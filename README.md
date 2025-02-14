# **Documentação do Projeto SaaS Oficina**

## **Índice**
1. [Visão Geral](#visao-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Configuração do Backend](#configuracao-do-backend)
5. [Configuração do Frontend](#configuracao-do-frontend)
6. [Execução do Projeto](#execucao-do-projeto)
7. [Funcionalidades Implementadas](#funcionalidades-implementadas)
8. [Próximos Passos](#proximos-passos)

---

## **1. Visão Geral** <a name="visao-geral"></a>
Este projeto é um SaaS para oficinas mecânicas, permitindo o gerenciamento de **clientes, veículos, serviços, produtos e estoque**. O sistema inclui um **dashboard moderno**, cadastro e listagem de dados, autenticação JWT e um design responsivo com **modo escuro/claro**.

---

## **2. Tecnologias Utilizadas** <a name="tecnologias-utilizadas"></a>
### **Backend:**
- Python (Django + Django REST Framework)
- PostgreSQL
- JWT (Django REST Framework SimpleJWT)
- Docker e Docker Compose

### **Frontend:**
- React (Next.js + TypeScript)
- Material-UI (MUI)
- Axios para requisições

### **Infraestrutura:**
- Docker para conteinerização
- Volumes do Docker para persistência de dados
- Nginx para servir o frontend em produção (futuro)

---

## **3. Estrutura do Projeto** <a name="estrutura-do-projeto"></a>
```
saas-oficina/
│── backend/
│   ├── apps/
│   │   ├── users/         # Gerenciamento de usuários
│   │   ├── workshops/     # Oficinas mecânicas
│   │   ├── customers/     # Clientes
│   │   ├── vehicles/      # Veículos
│   │   ├── services/      # Serviços (trocas de óleo, etc.)
│   │   ├── products/      # Produtos
│   │   ├── inventory/     # Estoque
│   │   ├── payments/      # Pagamentos e assinaturas
│   │   ├── notifications/ # Notificações
│   ├── saas_oficinas/     # Configuração principal do Django
│   ├── Dockerfile
│   ├── docker-compose.yml
│── frontend/
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas do Next.js
│   ├── styles/            # Tema do Material-UI
│   ├── Dockerfile
│   ├── docker-compose.yml
```

---

## **4. Configuração do Backend** <a name="configuracao-do-backend"></a>

### **4.1. Criando e Configurando o Ambiente**
```bash
# Clonar o repositório
git clone https://github.com/dgirotto0/saas-oficina.git
cd saas-oficina/backend/

# Criar e ativar o ambiente virtual
python3 -m venv venv
source venv/bin/activate  # No Windows use: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt
```

### **4.2. Configuração do Banco de Dados PostgreSQL**
```bash
# Criar banco de dados (se necessário)
sudo -u postgres psql
CREATE DATABASE saas_oficina_db;
CREATE USER saas_user WITH PASSWORD 'senha_segura';
ALTER ROLE saas_user SET client_encoding TO 'utf8';
ALTER ROLE saas_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE saas_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE saas_oficina_db TO saas_user;
\q
```

### **4.3. Rodando Migrations e Criando Superusuário**
```bash
# Aplicar migrations
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser
```

### **4.4. Rodar o Servidor**
```bash
python manage.py runserver
```
O backend estará disponível em `http://127.0.0.1:8000/`

---

## **5. Configuração do Frontend** <a name="configuracao-do-frontend"></a>

### **5.1. Instalando Dependências**
```bash
cd ../frontend/
npm install
```

### **5.2. Rodando o Servidor Next.js**
```bash
npm run dev
```
Acesse `http://localhost:3000/`

---

## **6. Execução do Projeto** <a name="execucao-do-projeto"></a>
### **Rodando com Docker**
```bash
cd saas-oficina/
docker-compose up --build
```

Isso inicializará **backend e frontend** via Docker Compose.

---

## **7. Funcionalidades Implementadas** <a name="funcionalidades-implementadas"></a>

✅ **Autenticação JWT**

✅ **Dashboard Moderno**

✅ **Modo Escuro/Claro**

✅ **Gerenciamento de Clientes, Veículos e Serviços**

✅ **Registro e Listagem com Tabelas Responsivas**

✅ **Integração entre Frontend e Backend**

✅ **Arquitetura Containerizada (Docker)**

✅ **Design Moderno com Material-UI**

---

## **8. Próximos Passos** <a name="proximos-passos"></a>
🔜 **Controle de Estoque Avançado**

🔜 **Relatórios e Insights com Gráficos**

🔜 **Gerenciamento de Pagamentos e Assinaturas**

🔜 **Melhoria da API com GraphQL**

🔜 **Deploy em Nuvem com CI/CD**

---

### **Conclusão**
Este projeto já conta com um backend robusto e um frontend moderno. Os próximos passos envolvem aprimoramentos na experiência do usuário e novas funcionalidades para tornar a solução ainda mais completa. 🚀

