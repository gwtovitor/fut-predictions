# FUT Predictions

## Visão Geral

O **FUT Predictions** é um projeto de estudo desenvolvido para explorar e implementar os princípios da **Arquitetura Limpa (Clean Architecture)** em uma aplicação Node.js. O projeto tem como objetivo fornecer previsões de partidas de futebol utilizando APIs externas e um banco de dados MongoDB, com forte ênfase em modularidade, manutenibilidade e separação de responsabilidades.

Este projeto é aberto para qualquer pessoa que queira fazer um fork, contribuir ou utilizá-lo como recurso de aprendizado sobre Arquitetura Limpa e desenvolvimento backend.

## Funcionalidades

-   Obter dados de partidas de futebol a partir de uma API externa.
-   Gerar previsões de partidas utilizando a API Gemini.
-   Armazenar e recuperar dados usando MongoDB.
-   Autenticação segura com JWT.
-   Estrutura baseada em Arquitetura Limpa para escalabilidade e manutenibilidade.

## Pré-requisitos

Para executar este projeto localmente, certifique-se de ter instalado:

-   Node.js (versão 16 ou superior)
-   MongoDB (instância local ou na nuvem)
-   npm ou yarn

## Variáveis de Ambiente

Para configurar o projeto, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
SALT_ROUNDS=""
DB_MONGO_URL=""
JWT_SECRET=""
FOOTBALL_DATA_API=""
GEMINI_API_URL=""
GEMINI_API_KEY=""
```

### Descrição das Variáveis de Ambiente

-   `SALT_ROUNDS`: Número de rodadas para hash de senhas com bcrypt.
-   `DB_MONGO_URL`: String de conexão com o MongoDB (ex.: `mongodb://localhost:27017/fut-predictions`).
-   `JWT_SECRET`: Chave secreta para autenticação com JSON Web Token (JWT).
-   `FOOTBALL_DATA_API`: Chave da API de dados de futebol (ex.: Football-Data.org).
-   `GEMINI_API_URL`: URL base da API Gemini.
-   `GEMINI_API_KEY`: Chave da API para acessar a Gemini.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/gwtovitor/fut-predictions.git
    cd fut-predictions
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o arquivo `.env` com as variáveis de ambiente necessárias.
4. Inicie a aplicação:
    ```bash
    npm start
    ```

## Rotas Disponíveis

Abaixo estão as rotas disponíveis na API, os inputs necessários e os retornos esperados:

### 1. **POST /signup**

-   **Descrição**: Registrar um novo usuário.
-   **Input**:
    ```json
    {
    	"username": "string",
    	"email": "string",
    	"password": "string"
    }
    ```
-   **Retorno**:
    ```json
     {
        "token": "string";
      }
    ```

### 2. **POST /login**

-   **Descrição**: Autenticar um usuário e retornar um token JWT.
-   **Input**:
    ```json
    {
    	"email": "string",
    	"password": "string"
    }
    ```
-   **Retorno**:
    ```json
    {
    	"token": "string"
    }
    ```

### 3. **GET /getMatches/:date**

-   **Descrição**: Obter uma lista de partidas de futebol futuras.
-   **Params**: date: yyyy/MM/dd.
-   **Headers**: `Authorization: Bearer <JWT_TOKEN>`
-   **Retorno**:
    ```json
    [{ "date": "string", "homeTeam": "TTeam", "awayTeam": "TTeam" }]
    ```

### 4. **GET /getMatchesWithAnalysis/:date**

-   **Descrição**: Gerar uma previsão para uma partida específica.
-   **Params**: date: yyyy/MM/dd.
-   **Headers**: `Authorization: Bearer <JWT_TOKEN>`
-   **Retorno**:
    ```json
    {
    	"date": "string",
    	"homeTeam": "TTeam",
    	"awayTeam": "TTeam",
    	"analysis": "MatchAnalysis"
    }
    ```

## Como Contribuir

Se você deseja contribuir com este projeto, sinta-se à vontade para fazer um fork do repositório e enviar um pull request. Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/sua-funcionalidade`).
3. Faça suas alterações e commit (`git commit -m "Adiciona sua funcionalidade"`).
4. Envie a branch para o repositório remoto (`git push origin feature/sua-funcionalidade`).
5. Abra um pull request.

## Estrutura do Projeto

O projeto segue os princípios da **Arquitetura Limpa**, com a seguinte estrutura:

-   **src/domain**: Lógica de negócios principal, entidades e casos de uso.
-   **src/application**: Serviços da aplicação e interfaces.
-   **src/infrastructure**: Serviços externos (ex.: banco de dados, APIs) e controladores.
-   **src/presentation**: Rotas da API e manipuladores HTTP.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
