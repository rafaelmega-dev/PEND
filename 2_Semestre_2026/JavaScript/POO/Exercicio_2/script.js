class Aluno {
    nome;
    idade;
    curso;
    matricula;

    constructor(nome, idade, curso, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.matricula = matricula;
    }

    aprender() {
        console.log(`${this.nome} está aprendendo ${this.curso}.`);
    }

    estudar() {
        console.log(`${this.nome} está estudando para a matrícula ${this.matricula}.`);
    }

    apresentar() {
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos, estou cursando ${this.curso} e minha matrícula é ${this.matricula}.`);
    }
}

const aluno1 = new Aluno("Rafael Mega", 17, "Matemática", "123456");
const aluno2 = new Aluno("Vitória Pierre Mello", 18, "História", "654321");
const aluno3 = new Aluno("Samuel Ângelo Carneiro Dias", 19, "Filosofia", "987654");

console.log("--------------------------------------------------");
console.log("=======Atributos do aluno 1:=======");
console.log("Nome:", aluno1.nome);
console.log("Idade:", aluno1.idade);
console.log("Curso:", aluno1.curso);
console.log("Matrícula:", aluno1.matricula);
console.log("--------------------------------------------------");
console.log("=======Atributos do aluno 2:=======");
console.log("Nome:", aluno2.nome);
console.log("Idade:", aluno2.idade);
console.log("Curso:", aluno2.curso);
console.log("Matrícula:", aluno2.matricula);
console.log("--------------------------------------------------");
console.log("=======Atributos do aluno 3:=======");
console.log("Nome:", aluno3.nome);
console.log("Idade:", aluno3.idade);
console.log("Curso:", aluno3.curso);
console.log("Matrícula:", aluno3.matricula);
console.log("--------------------------------------------------");

aluno1.aprender();
aluno1.estudar();
aluno1.apresentar();
aluno2.aprender();
aluno2.estudar();
aluno2.apresentar();
aluno3.aprender();
aluno3.estudar();
aluno3.apresentar();

