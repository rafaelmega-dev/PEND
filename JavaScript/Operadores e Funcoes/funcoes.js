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
let nomeUsuario = prompt("Digite seu nome:");
let altura = prompt("Digite sua altura em metros:");
let peso = prompt("Digite seu peso em kg:");
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}
imc = calcularIMC(peso, altura);
imcArredondado = imc.toFixed(2);
if (imc < 18.5) {
    console.log(nomeUsuario + ", seu IMC é de " + imcArredondado + ", você está abaixo do peso");
} else if (imc >= 18.5 && imc < 25) {
    console.log(nomeUsuario + ", seu IMC é de " + imcArredondado + ", você está com peso normal");
} else if (imc >= 25 && imc < 30) {
    console.log(nomeUsuario + ", seu IMC é de " + imcArredondado + ", você está com sobrepeso");
} else {
    console.log(nomeUsuario + ", seu IMC é de " + imcArredondado + ", você está com obesidade");
}

console.log("==========Atividade 8:==========");
let numero4 = prompt("Digite um número:");
function imparOuPar(numero) {
    if (numero % 2 === 0) {
        return "Par";
    } else {
        return "Ímpar";
    }
}
function negativoOuPositivo(numero) {
    if (numero < 0) {
        return "Negativo";
    }
    else {
        return "Positivo";
    }           
}
function verificarPrimo(numero) {
    if (numero <= 1) {
        return "não é Primo";
    }  
    for (let i = 2; i <= Math.sqrt(numero); i++) {    //para verificar se o número é primo, basta verificar se ele é divisível por algum número  entre 2 e a raiz quadrada do número. Se for divisível por algum desses números, então ele não é primo.
        if (numero % i === 0) {
            return "não é Primo";
        }
    }
    return "é Primo";
}       
console.log(numero4 + " " + (verificarPrimo(numero4))); 
console.log(numero4 + " é um número " + (negativoOuPositivo(numero4)));
console.log(numero4 + " é um número " + (imparOuPar(numero4)));