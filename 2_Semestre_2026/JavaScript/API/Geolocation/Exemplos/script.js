navigator.geolocation.getCurrentPosition(
    function(posicao) {
        console.log("Latitude: ", posicao.coords.latitude);
        console.log("Longitude: ", posicao.coords.longitude);
        console.log("Precisão: ", posicao.coords.accuracy);
    },
    function(erro) {
        console.log("Não foi possível obter sua localização.",erro);
    }
);