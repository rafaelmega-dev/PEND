// Atividade 1-Botão que deixa azul e vermelho

let botaoAzul = document.querySelector("#botaoAzul");
let botaoVermelho = document.querySelector("#botaoVermelho");
let textoCor = document.querySelector("#textoCor");

botaoAzul.addEventListener("click", function() {
   textoCor.style.color = "blue";
});

botaoVermelho.addEventListener("click", function() {
    textoCor.style.color = "red"; 
});


// Atividade 2-Botão que esconde o texto

let botaoOcultar = document.querySelector("#botaoOcultar");
let textoEscondido = document.querySelector("#textoEscondido");
botaoOcultar.addEventListener("click", function() {
    textoEscondido.classList.toggle("oculto");
});


// Atividade 3-Contador de caracteres

let inputTexto = document.querySelector("#inputTexto");
let paragContCarac = document.querySelector("#paragContCarac");

inputTexto.addEventListener("keyup", function() {  
    let contCarac = inputTexto.value.length;
    paragContCarac.textContent = "Caracteres digitados: " + contCarac;
});


//Atividade 4-Contador de cliques

let botaoContCliques = document.querySelector("#botaoContCliques");
let paragContCliques = document.querySelector("#paragContCliques");
let contCliques = 0;
botaoContCliques.addEventListener("click", function() {
    contCliques++;
    paragContCliques.textContent = "Número de cliques: " + contCliques;
});


//Atividade 5-Criar item da lista

let botaoListaAdd = document.getElementById("botaoListaAdd");
let inputItemLista = document.getElementById("inputItemLista")

botaoListaAdd.addEventListener("click", function() {
    let novoItemLista = document.createElement("li");
    novoItemLista.textContent = inputItemLista.value;
    document.getElementById("lista").appendChild(novoItemLista);
});


