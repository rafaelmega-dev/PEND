let botao = document.querySelector("#cadastrar");
let mensagem = document.querySelector("#mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent = "Cadastrado!";
});