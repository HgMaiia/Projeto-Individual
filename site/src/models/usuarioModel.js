var database = require("../database/config")

function autenticar(email, senha) {
   var instrucaoSql = `
    SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?;
`;
    return database.executar(instrucaoSql, [email, senha]);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cpf, senha) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
       INSERT INTO usuario (nome, email, cpf, senha)
        VALUES (?, ?, ?, ?);
    `;
   return database.executar(instrucaoSql, [nome, email, cpf, senha]);
}

module.exports = {
    autenticar,
    cadastrar
};