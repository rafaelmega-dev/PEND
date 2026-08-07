//Classe-modelo que criamos para criar objetos do tipo carro
class Carro {
    
    //Atributos-são as características que o objeto vai ter
    marca;
    modelo;
    ano;
    cor;

    //Método construtor especial- é o método que vai ser chamado quando criarmos um objeto do tipo carro
    constructor(marca, modelo, ano, cor) {
    
        //Significa "este objeto" e é usado para referenciar os atributos do objeto que está sendo criado
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }

    //Métodos- são as ações que o objeto pode realizar
    ligar() {
        console.log("O carro está ligado");
    }

    acelerar() {
        console.log("O carro está acelerando");
    }

    frear() {
        console.log(`${this.modelo} freiou. `);
    }
}

//Objeto- é uma instância da classe carro, ou seja, é um carro específico que criamos a partir do modelo da classe carro
const carro1 = new Carro("Fiat", "Uno", 2020, "Prata");
console.log("Carro 1:",carro1);

//Outro objeto- é outra instância da classe carro, ou seja, é outro carro específico que criamos a partir do modelo da classe carro
const carro2 = new Carro("Chevrolet", "Onix", 2021, "Preto");
console.log("Carro 2:",carro2);

const carro3 = new Carro("Volkswagen", "Gol", 2022, "Branco");
console.log("Carro 3:",carro3);


console.log("--------------------------------------------------");
console.log("Atributos do carro 1: ");
console.log("Marca:", carro1.marca);
console.log("Modelo:", carro1.modelo);
console.log("Ano:", carro1.ano);
console.log("Cor:", carro1.cor);
console.log("--------------------------------------------------");
console.log("Atributos do carro 2: ");
console.log("Marca:", carro2.marca);
console.log("Modelo:", carro2.modelo);
console.log("Ano:", carro2.ano);
console.log("Cor:", carro2.cor);
console.log("--------------------------------------------------");
console.log("Atributos do carro 3: ");
console.log("Marca:", carro3.marca);
console.log("Modelo:", carro3.modelo);
console.log("Ano:", carro3.ano);
console.log("Cor:", carro3.cor);
console.log("--------------------------------------------------");

//Chamando os métodos do objeto carro1
carro1.ligar();
carro1.acelerar();
carro1.frear();

//Chamando os métodos do objeto carro2

carro2.ligar();
carro2.acelerar();
carro2.frear();

//Chamando os métodos do objeto carro3
carro3.ligar();
carro3.acelerar();
carro3.frear();