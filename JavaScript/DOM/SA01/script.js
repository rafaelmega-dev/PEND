//Regex para validar email
let mascaraEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//Botão de cadastro
let botao = document.getElementById("cadastrar");
//Mensagem de cadastro
let mensagem = document.getElementById("mensagem");
//Inputs do formulário
let nome = document.getElementById("nome");
let telefone = document.getElementById("telefone");
let email = document.getElementById("email");
let senha = document.getElementById("senha");

botao.addEventListener("click", function () {
    mensagem.textContent = "Cadastrado!";
});