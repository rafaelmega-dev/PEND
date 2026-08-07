//Objeto: conta_bancaria
//Atributos: n_agencia, n_conta, saldo, pix, tipo_conta, titular
//Métodos: depositar, consultar_saldo, consultar_pix, consultar_tipo_conta, consultar_titular

class ContaBancaria {
    n_agencia;
    n_conta;
    saldo;
    pix;
    tipo_conta;
    titular;

    constructor(n_agencia, n_conta, saldo, pix, tipo_conta, titular) {
        this.n_agencia = n_agencia;
        this.n_conta = n_conta;
        this.saldo = saldo;
        this.pix = pix;
        this.tipo_conta = tipo_conta;
        this.titular = titular;
    }

    depositar() {
        console.log(`O depósito foi realizado com sucesso na conta: ${this.n_conta}`);
    }

    consultar_saldo() {
        console.log(`O saldo da conta é: R$ ${this.saldo}`);
    }

    consultar_pix() {
        console.log(`O PIX da conta é: ${this.pix}`);
    }

    consultar_tipo_conta() {
        console.log(`O tipo da conta é: ${this.tipo_conta}`);
    }

    consultar_titular() {
        console.log(`O titular da conta é: ${this.titular}`);
    } 
}

const conta1 = new ContaBancaria("1234", "56789-0", 1000, "12345678900", "Corrente", "João Silva");

const conta2 = new ContaBancaria("4321", "98765-0", 500, "09876543210", "Poupança", "Maria Souza");

const conta3 = new ContaBancaria("5678", "54321-0", 2000, "11223344556", "Corrente", "Carlos Oliveira");

console.log("--------------------------------------------------"); 
console.log("Atributos da conta 1: ");
console.log("Número da Agência:", conta1.n_agencia);
console.log("Número da Conta:", conta1.n_conta);
console.log("Saldo:", conta1.saldo);
console.log("PIX:", conta1.pix);
console.log("Tipo da Conta:", conta1.tipo_conta);
console.log("Titular:", conta1.titular);
console.log("--------------------------------------------------");
console.log("Atributos da conta 2: ");
console.log("Número da Agência:", conta2.n_agencia);
console.log("Número da Conta:", conta2.n_conta);
console.log("Saldo:", conta2.saldo);
console.log("PIX:", conta2.pix);
console.log("Tipo da Conta:", conta2.tipo_conta);
console.log("Titular:", conta2.titular);
console.log("--------------------------------------------------");
console.log("Atributos da conta 3: ");
console.log("Número da Agência:", conta3.n_agencia);
console.log("Número da Conta:", conta3.n_conta);
console.log("Saldo:", conta3.saldo);
console.log("PIX:", conta3.pix);
console.log("Tipo da Conta:", conta3.tipo_conta);
console.log("Titular:", conta3.titular);
console.log("--------------------------------------------------");

conta1.depositar();
conta1.consultar_saldo();
conta1.consultar_pix();
conta1.consultar_tipo_conta();
conta1.consultar_titular();

conta2.depositar();
conta2.consultar_saldo();
conta2.consultar_pix();
conta2.consultar_tipo_conta();
conta2.consultar_titular();

conta3.depositar();
conta3.consultar_saldo();
conta3.consultar_pix();
conta3.consultar_tipo_conta();
conta3.consultar_titular();
