Nome e turma: Pedro Bazante Marques - 3NDN
Matéria: Programação Web III (PWIII)

Dependências:

    Node.js (v18+)
    Express
    mysql2 (Pool de conexões e Promises)
    dotenv
    cors

Rodar o Projeto Localmente:

    -Clonar esse repositório
    -Instalar dependências (npm isntall)
    -Configurar variáveis de ambiente (Copiar o arquivo .env.example para .env)
    -Criar o Banco de Dados e a Tabela (Através do schema.sql) executando ou abrindo o script schema.sql no seu MySQL ou MariaDB, podendo utilizar interfaces gráficas de SQL, como: DBeaver, MySQL Workbench, etc.
    -Copiar o .env.example para .env, colocando os dados do seu MySQL (usuário, senha, etc.)
    -Iniciar o Servidor (npm run watch)

Rotas/Endpoints:

    POST - '/usuarios' = Cadastro de usuaŕio no body
    GET - '/usuarios' = Lista todos os cadastros já presentes
    GET - '/usuarios/:id' = Lista o cadastro de acordo com ID de usuário
    PUT - '/usuarios/:id' = Atualizar dados de acordo com o ID de usuário
    DELETE - '/usuarios/:id' = Remover usuário de acordo com o ID

Arquitetura usada (dentro de src/: - MVC)

    config/: guarda a conexão com o MySQL (usando connection pool) e lê as variáveis do .env com o dotenv.
    models/: é o único lugar onde há SQL (SELECT, INSERT, UPDATE e DELETE). Todas as queries são parametrizadas.
    controllers/: recebe a requisição, confere se os dados enviados estão certos, chama o Model e devolve a resposta com o status HTTP correto.
    routes/: define os endpoints com express.Router() e liga cada verbo HTTP à função do Controller.
    server.js: só configura os middlewares e inicia o servidor. 
