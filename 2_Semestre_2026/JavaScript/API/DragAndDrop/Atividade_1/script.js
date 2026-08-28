const pecas = document.querySelectorAll('.peca');
const casas = document.querySelectorAll('.casa');
const mensagem = document.getElementById('mensagem');
const btnSortear = document.getElementById('btn-sortear');

let turnoAtual = null;
let jogoAtivo = false;

const combinacoesVitoria = [
['casa_1_1', 'casa_1_2', 'casa_1_3'],
['casa_2_1', 'casa_2_2', 'casa_2_3'],
['casa_3_1', 'casa_3_2', 'casa_3_3'],
['casa_1_1', 'casa_2_1', 'casa_3_1'],
['casa_1_2', 'casa_2_2', 'casa_3_2'],
['casa_1_3', 'casa_2_3', 'casa_3_3'],
['casa_1_1', 'casa_2_2', 'casa_3_3'],
['casa_1_3', 'casa_2_2', 'casa_3_1']
];

btnSortear.addEventListener('click', () => {
turnoAtual = Math.random() < 0.5 ? 'bola' : 'xis';
jogoAtivo = true;


mensagem.textContent =
    `Sorteado! É a vez do jogador ${turnoAtual === 'bola' ? '⭕' : '✖️'}`;

mensagem.style.color = '#333';
btnSortear.style.display = 'none';


});

pecas.forEach(peca => {
peca.addEventListener('dragstart', event => {
if (!jogoAtivo) {
event.preventDefault();
return;
}


    const jogador = peca.id.startsWith('bolinha') ? 'bola' : 'xis';

    if (jogador !== turnoAtual) {
        event.preventDefault();

        mensagem.textContent =
            `Agora é a vez do jogador ${turnoAtual === 'bola' ? '⭕' : '✖️'}!`;

        return;
    }

    event.dataTransfer.setData('text/plain', peca.id);
});


});

casas.forEach(casa => {

casa.addEventListener('dragover', event => {
    if (jogoAtivo && !casa.querySelector('.peca')) {
        event.preventDefault();
    }
});

casa.addEventListener('drop', event => {
    event.preventDefault();

    if (!jogoAtivo || casa.querySelector('.peca')) {
        return;
    }

    const idPeca = event.dataTransfer.getData('text/plain');
    const peca = document.getElementById(idPeca);

    if (!peca) {
        return;
    }

    const jogador = peca.id.startsWith('bolinha') ? 'bola' : 'xis';

    if (jogador !== turnoAtual) {
        return;
    }

    casa.appendChild(peca);

    if (checarResultado()) {
        return;
    }

    turnoAtual = turnoAtual === 'bola' ? 'xis' : 'bola';

    mensagem.textContent =
        `É a vez do jogador ${turnoAtual === 'bola' ? '⭕' : '✖️'}`;

    mensagem.style.color = '#333';
});


});

function checarResultado() {


for (const combinacao of combinacoesVitoria) {

    const peca1 = document
        .getElementById(combinacao[0])
        .querySelector('.peca');

    const peca2 = document
        .getElementById(combinacao[1])
        .querySelector('.peca');

    const peca3 = document
        .getElementById(combinacao[2])
        .querySelector('.peca');

    if (peca1 && peca2 && peca3) {

        const jogador1 = peca1.id.startsWith('bolinha') ? 'bola' : 'xis';
        const jogador2 = peca2.id.startsWith('bolinha') ? 'bola' : 'xis';
        const jogador3 = peca3.id.startsWith('bolinha') ? 'bola' : 'xis';

        if (
            jogador1 === jogador2 &&
            jogador2 === jogador3
        ) {

            const simbolo = jogador1 === 'bola' ? '⭕' : '✖️';

            mensagem.textContent =
                `O jogador ${simbolo} venceu! 🎉`;

            mensagem.style.color = '#2e7d32';
            jogoAtivo = false;

            return true;
        }
    }
}

const casasPreenchidas =
    document.querySelectorAll('.casa .peca').length;

if (casasPreenchidas === 9) {

    mensagem.textContent = 'O jogo empatou! 😔';
    mensagem.style.color = '#d32f2f';
    jogoAtivo = false;

    return true;
}

return false;


}
