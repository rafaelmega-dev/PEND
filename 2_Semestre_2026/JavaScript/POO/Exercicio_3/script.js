class Produto {
    nome;
    preco;
    estoque;

    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender() {
        console.log(`O produto ${this.nome} foi vendido por R$ ${this.preco}.`);
    }

    repor() {
        console.log(`O estoque do produto ${this.nome} foi reposto. Novo estoque: ${this.estoque}.`);
    }

    alterarPreco() {
        console.log(`O preço do produto ${this.nome} foi alterado para R$ ${this.preco}.`);
    }
}

const produto1 = new Produto("Camiseta", 49.90, 100);
const produto2 = new Produto("Calça Jeans", 99.90, 50);
const produto3 = new Produto("Tênis Esportivo", 149.90, 30);

console.log("--------------------------------------------------");
console.log("=======Atributos do produto 1:=======");
console.log("Nome:", produto1.nome);
console.log("Preço:", produto1.preco);
console.log("Estoque:", produto1.estoque);
console.log("--------------------------------------------------");
console.log("=======Atributos do produto 2:=======");
console.log("Nome:", produto2.nome);
console.log("Preço:", produto2.preco);
console.log("Estoque:", produto2.estoque);
console.log("--------------------------------------------------");
console.log("=======Atributos do produto 3:=======");
console.log("Nome:", produto3.nome);
console.log("Preço:", produto3.preco);
console.log("Estoque:", produto3.estoque);
console.log("--------------------------------------------------");

produto1.vender();
produto1.repor();
produto1.alterarPreco();

produto2.vender();
produto2.repor();
produto2.alterarPreco();

produto3.vender();
produto3.repor();
produto3.alterarPreco();