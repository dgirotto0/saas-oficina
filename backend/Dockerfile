# Use uma imagem base leve do Python 3.12
FROM python:3.12-slim

# Variáveis de ambiente para melhorar a performance
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala dependências do sistema (incluindo libpq para PostgreSQL)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de requisitos e instala as dependências Python
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia o restante do código para dentro do container
COPY . /app/

# (Opcional) Coleta arquivos estáticos se necessário
RUN python manage.py collectstatic --noinput

# Expõe a porta 8000 (porta padrão do Gunicorn/Django)
EXPOSE 8000

# Comando para iniciar o servidor com Gunicorn
CMD ["gunicorn", "saas_oficinas.wsgi:application", "--bind", "0.0.0.0:8000"]
