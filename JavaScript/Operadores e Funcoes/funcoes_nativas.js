console.log("==============Funções Nativas:==============");
let agora = new Date();
console.log(agora);


function mostraDataHora() {
    let data = new Date();

    console.log("Dia atual",data.getDate());
    console.log("Mês atual",data.getMonth() + 1); //os meses começam do 0na programção, então é necessário adicionar 1 para obter o mês correto
    console.log("Ano atual",data.getFullYear());
    console.log("Hora atual",data.getHours());
    console.log("Minuto atual",data.getMinutes());
    console.log("Segundo atual",data.getSeconds());
    let diaSemana = ("Dia da semana atual",data.getDay());
    if (diaSemana === 0) {
        console.log("Dia da semana atual: Domingo");
    }
    else if (diaSemana === 1) {
        console.log("Dia da semana atual: Segunda-feira");
    }
    else if (diaSemana === 2) {
        console.log("Dia da semana atual: Terça-feira");
    }
    else if (diaSemana === 3) {
        console.log("Dia da semana atual: Quarta-feira");
    }
    else if (diaSemana === 4) {
        console.log("Dia da semana atual: Quinta-feira");
    }
    else if (diaSemana === 5) {
        console.log("Dia da semana atual: Sexta-feira");
    }
    else if (diaSemana === 6) {
        console.log("Dia da semana atual: Sábado");
    };
     //0 é domingo, 1 é segunda-feira, 2 é terça-feira, 3 é quarta-feira, 4 é quinta-feira, 5 é sexta-feira e 6 é sábado
}
mostraDataHora()


console.log("============================Desafio 1=============================");

function dataConcatenada() {
    let data = new Date();
    let horas = data.getHours();
    let minutos = data.getMinutes();
    let segundos = data.getSeconds();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }
    else {
        mes = mes;
    }
    let ano = data.getFullYear();
    return  horas + ":" + minutos + ":" + segundos + " " +dia + "/" + mes + "/" + ano; 
}
console.log(dataConcatenada());


console.log("============================Mais funções nativas=============================");

let pi = (Math.PI);
console.log( pi.toFixed(2));

function calcularOperacoes(numero) {
    console.log("Número:", numero);
    console.log("Raiz quadrada:", Math.sqrt(numero));
    console.log("Número arredondado para baixo:", Math.floor(numero));
    console.log("Número arredondado para cima:", Math.ceil(numero));
    console.log("Número arredondado para o inteiro mais próximo:", Math.round(numero));
}
calcularOperacoes(7.8);

console.log("=============================Desafio 2=============================");

function calcularOperacoesDesafio(numero) {
    console.log("Número:", numero);
    console.log("Elevado ao quadrado:", Math.pow(numero, 2));
    console.log("Elevado ao cubo:", Math.pow(numero, 3));
    console.log("Valor absoluto:", Math.abs(numero));
}
calcularOperacoesDesafio(-5);
calcularOperacoesDesafio(3);


console.log("=============================Funções de Texto=============================");

function analisarTexto(texto) {
    console.log("Texto:", texto);
    console.log("Número de caracteres:", texto.length);
    console.log("Texto em maiúsculas:", texto.toUpperCase());
    console.log("Texto em minúsculas:", texto.toLowerCase());
}

analisarTexto("Olá, Mundo!");


function verificaTexto(frase) {
    console.log(frase.includes("JavaScript"));
}
verificaTexto("Eu estudo JavaScript!");

function concatenaTexto(nome,curso) {
    console.log("Aluno: "+ nome + "| Curso: " + curso);
}
concatenaTexto("Rafael","JavaScript");





