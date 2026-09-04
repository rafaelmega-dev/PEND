const img = document.querySelector('#img');

navigator.geolocation.getCurrentPosition(
    function(posicao) {
        console.log("Latitude: ", posicao.coords.latitude);
        console.log("Longitude: ", posicao.coords.longitude);
        console.log("Precisão: ", posicao.coords.accuracy);
        
        img.src = "assets/aceito.png";
    },
    function(erro) {
        console.log("Não foi possível obter sua localização.", erro);

        if (erro.code === erro.PERMISSION_DENIED) {
            img.src = "assets/negado.png";
        }
    }
);