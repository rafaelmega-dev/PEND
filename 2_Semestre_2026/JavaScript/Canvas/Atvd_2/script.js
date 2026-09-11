const camera = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');
const botao = document.querySelector('#botao');
const foto = document.querySelector('#foto');
const nome = document.querySelector('#nome');
const nomeExibido = document.querySelector('#nomeExibido');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        camera.srcObject = stream;
    })
    .catch(function(erro) {
        console.error("Erro ao acessar a câmera: ", erro);
    });

botao.addEventListener('click', function() {
    canvas.width = camera.clientWidth;
    canvas.height = camera.clientHeight;

    contexto.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );

    foto.src = canvas.toDataURL("image/png");
    nomeExibido.textContent = "Nome: " + nome.value;
});