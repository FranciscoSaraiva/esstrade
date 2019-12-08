## Arquiteturas de Software

### ESS Trade Platform

#### Projeto para simulação de plataforma de troca de CFDs

Implementações necessárias à 1º fase: 
- Produto funcional com conexão à API da Yahoo
- Implementação de design patterns
  - **Observer** obrigatório

## Instalação
- Criar schema com nome da base de dados 
```
CREATE SCHEMA `esstrade` ;
```
- Configurar o ficheiro ormconfig.json para as informações da conexão MySQL

- Correr ``npm install`` na base do projeto **esstrade**

- Correr a aplicação com ``npm start``  
 