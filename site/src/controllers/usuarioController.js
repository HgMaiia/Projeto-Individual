var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || email == "") {
        res.status(400).send("Informe seu email!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Informe sua senha!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {

                    res.status(200).json({
                        id: resultadoAutenticar[0].id,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email
                    });
                    
                    } else {

                    res.status(403).send("Email ou senha inválidos!");

                }

            })

            .catch(function (erro) {

                console.log(erro);
                res.status(500).send("Erro ao realizar login!");

            });
    }
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
   if (nome == undefined) {
        res.status(400).send("Preencha seu nome!");
    } else if (email == undefined) {
        res.status(400).send("Preencha seu email!");
    } else if (senha == undefined) {
        res.status(400).send("Preencha sua senha!");
    } else if (cpf == undefined) {
        res.status(400).send("Preencha seu cpf!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
         usuarioModel.cadastrar(nome, email, cpf, senha)
            .then(function (resultado) {
                res.status(201).json({
                    mensagem: "Cadastro realizado com sucesso!"
                });
            })        
                       .catch(function (erro) {
                console.log(erro);
                if (erro.code == "ER_DUP_ENTRY") {
                    res.status(409).send("CPF ou email já cadastrado!");
                } else {
                    res.status(500).send("Erro ao realizar cadastro!");
                }
            });
    }
}


module.exports = {
    autenticar,
    cadastrar
}