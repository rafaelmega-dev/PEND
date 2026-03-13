console.log("Olá, JavaScript!");
let a = 10;
let b = 3;

console.log("Soma:",a + b);
console.log("Subtração:",a - b);
console.log("Multiplicação:",a * b);
console.log("Divisão:",a / b);
console.log("Resto de Divisão:",a % b);
console.log("Potência:",a ** b);

let contador = 5;
contador++;
console.log(contador);

let d = 15;
let e = 5;
let f = 2;
let f1 = 15;
console.log("Média:",(d + e + f1)/f);

let g = 10;
let h = 4;
console.log(g % h);

let x = 10;
let y = "10";

console.log("Igual(valor):",x == y);
console.log("Igual(tipo e valor):",x === y);
console.log("Diferente(valor):",x != y);
console.log("Diferente(tipo e valor):",x !== y);

console.log("Olá JavaScript é",a);


console.log("Atividade 3:");
let idade = 21;
let nome = "Ana";
let idade2 = 15;
let nome2 = "Bruno";
let idade3 = 18;
let nome3 = "Carla";
if (idade >= 18) {
    console.log(nome ,"é maior de idade.");
} else {
    console.log(nome,"é menor de idade.");
}
if (idade2 >= 18) {
    console.log(nome2 ,"é maior de idade.");
} else {
    console.log(nome2,"é menor de idade.");
}
if (idade3 >= 18) {
    console.log(nome3 ,"é maior de idade.");
}   else {
    console.log(nome3,"é menor de idade.");
}

console.log("Atividade 4:");
let numero = 13;
let numero2 = 18;
if (numero > numero2) {
    console.log(numero+' é maior que '+numero2);
} else if (numero < numero2) {
    console.log(numero2+ ' é maior que '+ numero);
} else {
    console.log("Os números são iguais.");
}

console.log("Exemplos de Operadores Lógicos:");

let idadePessoa = 20;
let possuiCarteira = true;

console.log(idadePessoa >= 18 && possuiCarteira);//and-> ambas condições devem ser verdadeiras

let chovendo = false;
let guardaChuva = true;
console.log(chovendo || guardaChuva); //or-> pelo menos uma condição deve ser verdadeira

let luzAcesa = false;
console.log(!luzAcesa); //not-> inverte o valor lógico

console.log("Atividade 5:");
let nota1 = 7;
let nota2 = 8.0;
let nota3 = 6.0;
let media = (nota1 + nota2 + nota3) / 3;
let frequencia = 74; // em porcentagem

if (media >= 7.0 && frequencia >= 75) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}

console.log("Atividade 6:");

let loginUsuario= true;
let tokenUsuario= false;

console.log(loginUsuario || tokenUsuario);