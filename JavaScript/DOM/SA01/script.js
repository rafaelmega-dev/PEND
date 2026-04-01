//Regex para validação da senha
let mascaraSenhaTamanho = /^.{8,}$/;
let mascaraSenhaLetraMinu = /[a-z]/;
let mascaraSenhaLetraMaiu = /[A-Z]/;
let mascaraSenhaNumero = /\d/;

//Regex para validação do nome
let mascaraNome = /^[a-zA-Z\s]+$/;

//Regex para validação do telefone
let mascaraTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;

//Regex para validação do email
let mascaraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//Botão de cadastro
let botao = document.getElementById("cadastrar");

//Mensagem de cadastro
let mensagem = document.getElementById("mensagem");
let mensagemSenha = document.getElementById("mensagemSenha");

//Inputs do formulário
let nome = document.getElementById("nome");
let telefone = document.getElementById("telefone");
let email = document.getElementById("email");
let senha = document.getElementById("senha");
let endereco = document.getElementById("endereco");


document.getElementById("senha").addEventListener("keyup", function() {
        if (!mascaraSenhaTamanho.test(senha.value)) {
            mensagemSenha.textContent = "Sua senha deve conter pelo menos 8 caracteres.";
        } else if (!mascaraSenhaLetraMinu.test(senha.value)) {
            mensagemSenha.textContent = "Sua senha deve conter pelo menos uma letra minúscula.";
        } else if (!mascaraSenhaLetraMaiu.test(senha.value)) {
            mensagemSenha.textContent = "Sua senha deve conter pelo menos uma letra maiúscula.";
        } else if (!mascaraSenhaNumero.test(senha.value)) {
            mensagemSenha.textContent = "Sua senha deve conter pelo menos um número.";
        } else {
            mensagemSenha.textContent = "";
    }
});

document.getELementkById("email").addEventListener("keyup", function() {
    

function validarFormulario() {
    if (nome.value.trim() === "" || telefone.value.trim() === "" || email.value.trim() === "" || senha.value.trim() === "") {
        mensagem.textContent = "Por favor, preencha todos os campos.";
    } else if (!mascaraNome.test(nome.value)) {
        mensagem.textContent = "Nome inválido. Use apenas letras e espaços.";
    } else if (!mascaraTelefone.test(telefone.value)) {
        mensagem.textContent = "Telefone inválido. Use o formato (xx) xxxxx-xxxx.";
    } else if (!mascaraEmail.test(email.value)) {
        mensagem.textContent = "Email inválido. Use um formato válido, como seuemail@exemplo.com";
    } else if (mensagemSenha.textContent === "Senha fraca. Use pelo menos 8 caracteres, incluindo letras e números.") {
        mensagem.textContent = "Senha inválida";
    } else {
        mensagem.textContent = "Cadastro realizado com sucesso!";
    }
}

botao.addEventListener("click", function() {
    validarFormulario(nome, telefone, email);
});
