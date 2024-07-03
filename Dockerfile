FROM postgres:latest

# Instala o cliente PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client
