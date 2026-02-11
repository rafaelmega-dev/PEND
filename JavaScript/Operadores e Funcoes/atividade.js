console.log("=======================================Atividade 1=======================================");
function dataHoraAtual() {
    let horaAtual = new Date();
    let hora = horaAtual.getHours();
    let minuto = horaAtual.getMinutes();
    console.log("Hora atual:", hora + ":" + minuto);
}
dataHoraAtual();


console.log("=======================================Atividade 2=======================================");
function somaeMedia(num1, num2) {
    let soma = num1 + num2;
    let media = soma / 2;
    console.log("Número 1:", num1);
    console.log("Número 2:", num2);
    console.log("Soma:", soma);
    console.log("Média:", media);
}
let num1 = prompt("Digite o primeiro número:");
let num2 = prompt("Digite o segundo número:");
num1 = parseFloat(num1);
num2 = parseFloat(num2);
somaeMedia(num1, num2);


console.log("=======================================Atividade 3=======================================");
function quantCaracteresEMaisculas(nome) {
    let quantidadeCaracteres = nome.length;
    let nomeMaiusculo = nome.toUpperCase();
    console.log("Nome:", nome);
    console.log("Quantidade de caracteres:", quantidadeCaracteres);
    console.log("Nome em maiúscula:", nomeMaiusculo);
}
let nome = prompt("Digite seu nome:");
quantCaracteresEMaisculas(nome);


console.log("=======================================Atividade 4=======================================");
function verificarTexto(frase) {
    return /html/i.test(frase);
} 
let frase = prompt("Digite uma frase:");
if (verificarTexto(frase)) {
    console.log("A frase contém a palavra 'html'.");
} else
    console.log("A frase não contém a palavra 'html'.");


