let email = document.querySelector("#inputEmail");
let senha = document.querySelector("#inputSenha");
let paragValidacaoEmail = document.querySelector("#paragValidacaoEmail");
let botaoValidarEmail = document.querySelector("#botaoValidarEmail");


function validarEmail(email) {
    if (email.includes("@") && email.includes(".")) {
        paragValidacaoEmail.textContent = "Email válido!";
paragValidacaoEmail.textContent = "Email válido!";
paragValidacaoEmail.className = "validation-message green";
    } else {
        paragValidacaoEmail.textContent = "Email inválido!";
paragValidacaoEmail.textContent = "Email inválido!";
paragValidacaoEmail.className = "validation-message red";
    }
}

botaoValidarEmail.addEventListener("click", function() {
    let email = document.querySelector("#inputEmail").value;
    validarEmail(email);
});




document.getElementById("inputSenha").addEventListener("keyup", function() {
    let senha = document.querySelector("#inputSenha").value;
    let paragValidacaoSenha = document.querySelector("#paragValidacaoSenha");
    if (senha.length > 10) {
paragValidacaoSenha.textContent = "Senha forte!";
paragValidacaoSenha.className = "validation-message green";
    } else if (senha.length >=6 && senha.length <= 10) {
paragValidacaoSenha.textContent = "Senha aceitável!";
paragValidacaoSenha.className = "validation-message orange";
    } else {
paragValidacaoSenha.textContent = "Senha fraca!";
paragValidacaoSenha.className = "validation-message red";
    }
});
