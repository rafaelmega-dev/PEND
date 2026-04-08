//Regex para validações
let mascaraSenhaTamanho = /^.{8,}$/;
let mascaraSenhaLetraMinu = /[a-z]/;
let mascaraSenhaLetraMaiu = /[A-Z]/;
let mascaraSenhaNumero = /\d/;
let mascaraNome = /^[a-zA-Z\s]+$/;
let mascaraTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
let mascaraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let mascaraCep = /^\d{5}-?\d{3}$/;
let mascaraRua = /^[a-zA-Z0-9\s,.-]+$/;
let mascaraNumero = /^\d+$/;
let mascaraComplemento = /^[a-zA-Z0-9\s,.-]*$/;

//Botão de cadastro
let botao = document.getElementById("cadastrar");
let botaoAddEndereco = document.getElementById("cadastrarEndereco");

//Mensagem de cadastro
let mensagemEmail = document.getElementById("mensagemEmail");
let mensagemSenha = document.getElementById("mensagemSenha");
let mensagemTelefone = document.getElementById("mensagemTelefone");
let mensagemNome = document.getElementById("mensagemNome");
let mensagemIndex = document.getElementById("mensagemIndex");
let mensagemEndereco = document.getElementById("mensagemEndereco");
let mensagemCep = document.getElementById("mensagemCep");
let mensagemRua = document.getElementById("mensagemRua");
let mensagemNumero = document.getElementById("mensagemNumero");
let mensagemComplemento = document.getElementById("mensagemComplemento");

// Elementos do formulário de endereço
let cep = document.getElementById("cep"); 
let rua = document.getElementById("rua");
let numero = document.getElementById("numero"); 
let complemento = document.getElementById("complemento");
let listaEnderecos = document.getElementById("listaEnderecos"); 

//Guardando os endereços em um array
let enderecos = [];

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

document.getElementById("email").addEventListener("keyup", function() {
    if (!mascaraEmail.test(email.value)) {
        mensagemEmail.textContent = "Email inválido. Use um formato válido, como exemplo@teste.com";
    } else {
        mensagemEmail.textContent = "";
    }
});

document.getElementById("telefone").addEventListener("keyup", function() {
    if (!mascaraTelefone.test(telefone.value)) {
        mensagemTelefone.textContent = "Telefone inválido. Use o formato (xx) xxxxx-xxxx.";
    } else {
        mensagemTelefone.textContent = "";
    }
});   

document.getElementById("nome").addEventListener("keyup", function() {
    if (!mascaraNome.test(nome.value)) {
        mensagemNome.textContent = "Nome inválido. Use apenas letras e espaços.";
    } else {
        mensagemNome.textContent = "";
    }
});

document.getElementById("cep").addEventListener("keyup",
function() {
    if (!mascaraCep.test(cep.value)) {
        mensagemCep.textContent = "CEP inválido. Use o formato xxxxx-xxx.";
    } else {
        mensagemCep.textContent = "";
    }
});

document.getElementById("rua").addEventListener("keyup", function() {
    if (!mascaraRua.test(rua.value)) {
        mensagemRua.textContent = "Rua inválida. Use apenas letras, números e espaços.";
    } else {
        mensagemRua.textContent = "";
    }
});

document.getElementById("numero").addEventListener("keyup", function() {
    if (!mascaraNumero.test(numero.value)) {
        mensagemNumero.textContent = "Número inválido. Use apenas números.";
    } else {
        mensagemNumero.textContent = "";
    }
});

document.getElementById("complemento").addEventListener("keyup", 
function() {
    if(!mascaraComplemento.test(complemento.value)) {
        mensagemComplemento.textContent = "Complemento inválido. Use apenas letras, números e espaços.";
    } else {
        mensagemComplemento.textContent = "";
    }
});


function validarFormulario() {
    if (nome.value.trim() === "" || telefone.value.trim() === "" || email.value.trim() === "" || senha.value.trim() === "") {
        mensagemIndex.textContent = "Por favor, preencha todos os campos.";
    } else if (mascaraNome.test(nome.value) && mascaraTelefone.test(telefone.value) && mascaraEmail.test(email.value) && mascaraSenhaTamanho.test(senha.value) && mascaraSenhaLetraMinu.test(senha.value) && mascaraSenhaLetraMaiu.test(senha.value) && mascaraSenhaNumero.test(senha.value)) { 
        mensagemIndex.textContent = "Cadastro realizado com sucesso!";
    } else {
        mensagemIndex.textContent = "Por favor, corrija os erros nos campos antes de cadastrar.";
    }
}

botao.addEventListener("click", function() {
    validarFormulario();
});

function validarFormularioEndereco() {
    if (cep.value.trim() === "" || rua.value.trim() === "" || numero.value.trim() === "" || complemento.value.trim() === "") {
        mensagemEndereco.textContent = "Por favor, preencha todos os campos.";
    } else if (mascaraCep.test(cep.value) && mascaraRua.test(rua.value) && mascaraNumero.test(numero.value) && mascaraComplemento.test(complemento.value)){ 
        mensagemEndereco.textContent = "Endereço cadastrado com sucesso!";
    } else {
        mensagemEndereco.textContent = "Por favor, corrija os erros nos campos antes de cadastrar.";

    }
}

botaoAddEndereco.addEventListener("click", function() {
    validarFormularioEndereco();
    if (mensagemEndereco.textContent === "Endereço cadastrado com sucesso!") {

    }
});