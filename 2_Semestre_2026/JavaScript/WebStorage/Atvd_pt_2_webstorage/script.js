class Produto {

    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = Number(preco);
        this.categoria = categoria;
        this.desconto = Number(desconto);
    }

    aplicarDesconto() {
        this.preco = this.preco - (this.preco * this.desconto / 100);
       
    }
}

class Estoque {

    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    exibir() {

        const resultado = document.querySelector("#resultado");

        resultado.innerHTML = ""

        this.produtos.forEach((produto, index) => {
            resultado.innerHTML += `
            <div>
                <p>Nome:${produto.nome}</p>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <p>Categoria: ${produto.categoria}</p>
                <p>Desconto:${produto.desconto}%</p>
                <button onclick="estoque.excluirProduto(${index})">Excluir</button>
            </div>
            `;
        })
    }
    excluirProduto(indice) {
        this.produtos.splice(indice, 1);

        localStorage.setItem("produtos", JSON.stringify(this.produtos));

        this.exibir();
        
    }
}

const estoque = new Estoque();
const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const categoria = document.querySelector("#categoria");
const desconto = document.querySelector("#desconto");
const botaoCadastrar = document.querySelector("#botaoCadastrar");
const botaoExcluir = document.querySelector("#botaoExcluir");

botaoCadastrar.addEventListener("click", function() {

    const produto = new Produto(nome.value, preco.value, categoria.value, desconto.value);

    produto.aplicarDesconto();
    estoque.adicionarProduto(produto);
    localStorage.setItem("produtos",JSON.stringify(estoque.produtos))
    estoque.exibir();
        
});

const dados = localStorage.getItem("produtos");

if (dados) {

    const produtosSalvos = JSON.parse(dados);

    produtosSalvos.forEach(produtoSalvo=> {
        const produto = new Produto(
        produtoSalvo.nome,
        produtoSalvo.preco,
        produtoSalvo.categoria,
        produtoSalvo.desconto,
    );

    estoque.adicionarProduto(produto);

    });
    

    estoque.exibir()
}

