navigator.mediaDevices.getUserMedia({
    video: true
})
.then(function(stream) {
    const video = document.querySelector('#camera');
    video.srcObject = stream;
})
.catch(function(erro) {
    console.log("Erro ao acessar a câmera: ", erro);
});

navigator.mediaDevices.getUserMedia({
    audio: true
})
.then(function(stream) {
    const audio = document.querySelector('#microfone');
    audio.srcObject = stream;
})
.catch(function(erro) {
    console.log("Erro ao acessar o microfone: ", erro);
});
