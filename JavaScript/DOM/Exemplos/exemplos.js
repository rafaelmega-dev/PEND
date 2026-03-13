document.getElementById("conteudo").innerHTML = "<p>Olá, mundo DOM! (Código HTML = innerHTML)</p>"

document.querySelector("#mensagem").textContent = "Texto simples, sem HTML"

document.querySelector("#foto").setAttribute("src","ricardo-fotor.png")

let url = document.getElementById("link").getAttribute("href")
console.log(url);

document.getElementById("caixa").style.backgroundColor = "lightblue";

document.getElementById("alerta").classList.add("destaque");

document.getElementById("alert").classList.remove("oculto");

let novoParagrafo = document.createElement("p");
novoParagrafo.textContent = "Este elemento foi criado pelo JavaScript!";
document.getElementById("container").appendChild(novoParagrafo);

let novoItem = document.createElement("li");
novoItem.textContent = "Item Novo";
document.getElementById("lista").appendChild(novoItem);

let item = document.getElementById("item1");
document.getElementById("list").removeChild(item);

