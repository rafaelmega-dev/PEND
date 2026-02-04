function saudacao1() {
    console.log("Olá, JavaScript!");
}
saudacao1();

function somar(a, b) {
    return a + b;
}
console.log(somar(10, 3));

function saudacao(nome) {
    console.log('Olá, ' + nome );
}
saudacao('Maria');

console.log("==========Atividade 7:==========");
let altura = 1.75;
let peso = 70;
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}
console.log(calcularIMC(peso, altura));

console.log("==========Atividade 8:==========");
let numero4 = 8;
function imparOuPar(numero) {
    if (numero % 2 === 0) {
        return "Par";
    } else {
        return "Ímpar";
    }
}
console.log(imparOuPar(numero4));