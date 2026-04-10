//Regex para validações dos campos
let mascaraSenhaTamanho = /^.{8,}$/;
let mascaraSenhaLetraMinu = /[a-z]/;
let mascaraSenhaLetraMaiu = /[A-Z]/;
let mascaraSenhaNumero = /\d/;
let mascaraNome = /^[a-zA-Z\s]+$/;
let mascaraTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
let mascaraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let mascaraCep = /^\d{5}-\d{3}$/;
let mascaraRua = /^[a-zA-Z0-9\s,.-]+$/;
let mascaraNumero = /^\d+$/;
let mascaraComplemento = /^[a-zA-Z0-9\s,.-]*$/;

//Botões de cadastro e adição de endereço
let botao = document.getElementById("cadastrar");
let botaoAddEndereco = document.getElementById("cadastrarEndereco");

//Mensagem de campo errado ou cadastro realizado
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

//Guarda os endereços em um array
let enderecos = [];

//Validação em tempo real do campo senha
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

//Validação em tempo real do campo email
document.getElementById("email").addEventListener("keyup", function() {
    if (!mascaraEmail.test(email.value)) {
        mensagemEmail.textContent = "Email inválido. Use um formato válido, como exemplo@teste.com";
    } else {
        mensagemEmail.textContent = "";
    }
});

//Validação em tempo real do campo telefone
document.getElementById("telefone").addEventListener("keyup", function() {
    if (!mascaraTelefone.test(telefone.value)) {
        mensagemTelefone.textContent = "Telefone inválido. Use o formato (xx) xxxxx-xxxx.";
    } else {
        mensagemTelefone.textContent = "";
    }
});   

//Validação em tempo real do campo nome
document.getElementById("nome").addEventListener("keyup", function() {
    if (!mascaraNome.test(nome.value)) {
        mensagemNome.textContent = "Nome inválido. Use apenas letras e espaços.";
    } else {
        mensagemNome.textContent = "";
    }
});

//Validação em tempo real do campo CEP
document.getElementById("cep").addEventListener("keyup",
function() {
    if (!mascaraCep.test(cep.value)) {
        mensagemCep.textContent = "CEP inválido. Use o formato xxxxx-xxx.";
    } else {
        mensagemCep.textContent = "";
    }
});

//Validação em tempo real do campo rua
document.getElementById("rua").addEventListener("keyup", function() {
    if (!mascaraRua.test(rua.value)) {
        mensagemRua.textContent = "Rua inválida. Use apenas letras, números e espaços.";
    } else {
        mensagemRua.textContent = "";
    }
});

//Validação em tempo real do campo número do endereço
document.getElementById("numero").addEventListener("keyup", function() {
    if (!mascaraNumero.test(numero.value)) {
        mensagemNumero.textContent = "Número inválido. Use apenas números.";
    } else {
        mensagemNumero.textContent = "";
    }
});

//Validação em tempo real do campo complemento do endereço
document.getElementById("complemento").addEventListener("keyup", 
function() {
    if(!mascaraComplemento.test(complemento.value)) {
        mensagemComplemento.textContent = "Complemento inválido. Use apenas letras, números e espaços.";
    } else {
        mensagemComplemento.textContent = "";
    }
});

//Função que valida o formulário de cadastro, garantindo que todos os campos estajam preenchidos e de forma correta
function validarFormulario() {
    
    //Cria a variável que guarda se o endereço foi selecionado ou não
    let enderecoSelecionado = document.querySelector('input[name="enderecoSelecionado"]:checked');

    //Verifica se não tem nenhum campo vazio
    if (nome.value.trim() === "" || telefone.value.trim() === "" || email.value.trim() === "" || senha.value.trim() === "") {
        mensagemIndex.textContent = "Por favor, preencha todos os campos.";

    //Verifica se o usuário selecionou um endereço
    } else if (!enderecoSelecionado) {
        mensagemIndex.textContent = "Selecione um endereço.";

    //Verifica se todos os campos estão corretos, utilizando os regex criados no início do código
    } else if (mascaraNome.test(nome.value) && mascaraTelefone.test(telefone.value) && mascaraEmail.test(email.value) && mascaraSenhaTamanho.test(senha.value) && mascaraSenhaLetraMinu.test(senha.value) && mascaraSenhaLetraMaiu.test(senha.value) && mascaraSenhaNumero.test(senha.value)) { 
        mensagemIndex.textContent = "Cadastro realizado com sucesso!";
        mensagemIndex.classList.replace("error-message", "success-message");

    //Caso algum campo não esteja preenchido corretamente, mostra a mensagem de erro para o usuário
    } else {
        mensagemIndex.textContent = "Por favor, corrija os erros nos campos antes de cadastrar.";
    }
}

//Função que valida o formulário de cadastro de edereço, garantindo que todos os campos estejam preenchidos e de forma correta
function validarFormularioEndereco() {

    //Verifica se não tem nenhum campo vazio
    if (cep.value.trim() === "" || rua.value.trim() === "" || numero.value.trim() === "") {
        mensagemEndereco.textContent = "Por favor, preencha todos os campos orbigatórios.";

    //Verifica se todos os campos estão corretos, utilizando os regex criados no início do código
    } else if (mascaraCep.test(cep.value) && mascaraRua.test(rua.value) && mascaraNumero.test(numero.value) && mascaraComplemento.test(complemento.value)){ 
        mensagemEndereco.classList.replace("error-message", "success-message");
        mensagemEndereco.textContent = "Endereço cadastrado com sucesso!";

    //Caso algum campo não esteja preenchido corretamente, mostra a mensagem de erro para o usuário
    } else {
        mensagemEndereco.textContent = "Por favor, corrija os erros nos campos antes de cadastrar.";

    }
}

//Função para renderizar os endereços cadastrados na lista (feito com auxílio de IA)
function renderizarEnderecos() {

    //Limpa a lista antes de renderizar novamente
    listaEnderecos.innerHTML = "";

    //Percorre o array de endereços e cria um item de lista para cada um
    enderecos.forEach((endereco, index) => {

        //Cria o item da lista com as informações do endereço e um radio button para seleção
        let li = document.createElement("li");
        li.innerHTML = `
            <label>
                <input type="radio" name="enderecoSelecionado" value="${index}">
                ${endereco.rua}, ${endereco.numero} - ${endereco.complemento} | CEP: ${endereco.cep}
            </label>
        `;

        //Adiciona o item à lista de endereços
        listaEnderecos.appendChild(li);
    });
}

//Botão que adiciona o endereço (feito com auxílio de IA)
botaoAddEndereco.addEventListener("click", function() {
    validarFormularioEndereco();
    //Se o endereço for válido, adiciona ao array e renderiza a lista
    if (mensagemEndereco.textContent === "Endereço cadastrado com sucesso!") {
        let novoEndereco = {
            cep: cep.value,
            rua: rua.value,
            numero: numero.value,
            complemento: complemento.value
        };
        //Envia o novo endereço para o array de endereços
        enderecos.push(novoEndereco);

        //Mostra o endereço cadastrado na lista de endereços
        renderizarEnderecos();

        //Limpa os campos do formulário de endereço
        cep.value = "";
        rua.value = "";
        numero.value = "";
        complemento.value = "";
    }
});

//Botão que valida tudo e realiza cadastro
botao.addEventListener("click", function() {
    validarFormulario();
});
