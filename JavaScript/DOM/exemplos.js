document.getElementById("conteudo").innerHTML = "<p>Olá, mundo DOM! (Código HTML = innerHTML)</p>"

document.querySelector("#mensagem").textContent = "Texto simples, sem HTML"

document.querySelector("#foto").setAttribute("src","ricardo-fotor.png")

let url = document.getElementById("link").getAttribute("href")
console.log(url);

document.getElementById("caixa").style.backgroundColor = "lightblue";

document.getElementById("alerta").classList.add("destaque");
