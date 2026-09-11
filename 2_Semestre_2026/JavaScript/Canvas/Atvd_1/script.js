const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

let aceno = 0;
let tempoInicial = null;

// Durações em milissegundos
const DURACAO_SUBIDA = 2500;  // 0s a 2.5s (levanta mão)
const DURACAO_ACENO = 10500;  // 2.5s a 13s (acena)
const DURACAO_ABRIR = 2000;   // 13s a 15s (relaxa os braços e inclina cabeça)

const TEMPO_INICIO_JATO = 8500; // 8.5s
const TEMPO_FIM_JATO = 13000;   // 13.0s (jato encerra)

let particulas = [];

function emitirJato(x, y, quantidade = 6) {
    for (let i = 0; i < quantidade; i++) {
        let anguloBase = Math.PI / 2.7; 
        let variacaoAngulo = (Math.random() - 0.5) * 0.25; 
        let angulo = anguloBase + variacaoAngulo;
        
        let velocidade = Math.random() * 10 + 10; 
        let tomCinza = Math.floor(Math.random() * 120 + 80); 

        particulas.push({
            x: x,
            y: y,
            vx: Math.cos(angulo) * velocidade,
            vy: Math.sin(angulo) * velocidade,
            raio: Math.random() * 4 + 2,
            cor: `rgb(${tomCinza}, ${tomCinza}, ${tomCinza})`,
            alpha: 1,
            decay: Math.random() * 0.008 + 0.008
        });
    }
}

function desenharRosto(x, y, estado) {
    contexto.save();
    contexto.lineWidth = 2;
    contexto.strokeStyle = '#000000';
    contexto.fillStyle = '#000000';

    if (estado === 'normal') {
        // Olho esquerdo neutro (ponto)
        contexto.beginPath();
        contexto.arc(x - 6, y - 2, 2, 0, Math.PI * 2);
        contexto.fill();

        // Olho direito neutro (ponto)
        contexto.beginPath();
        contexto.arc(x + 6, y - 2, 2, 0, Math.PI * 2);
        contexto.fill();

        // Boca neutra (linha reta)
        contexto.beginPath();
        contexto.moveTo(x - 4, y + 5);
        contexto.lineTo(x + 4, y + 5);
        contexto.stroke();

    } else if (estado === 'esforco') {
        // Olho esquerdo apertado (>)
        contexto.beginPath();
        contexto.moveTo(x - 9, y - 5);
        contexto.lineTo(x - 4, y - 2);
        contexto.lineTo(x - 9, y + 1);
        contexto.stroke();

        // Olho direito apertado (<)
        contexto.beginPath();
        contexto.moveTo(x + 9, y - 5);
        contexto.lineTo(x + 4, y - 2);
        contexto.lineTo(x + 9, y + 1);
        contexto.stroke();

        // Boca de esforço (aberta tensionada)
        contexto.beginPath();
        contexto.ellipse(x, y + 6, 4, 3, 0, 0, Math.PI * 2);
        contexto.stroke();

    } else if (estado === 'satisfacao') {
        // Olhos fechados de satisfação (arcos ^)
        contexto.beginPath();
        contexto.arc(x - 6, y - 2, 3.5, Math.PI, 0);
        contexto.stroke();

        contexto.beginPath();
        contexto.arc(x + 6, y - 2, 3.5, Math.PI, 0);
        contexto.stroke();

        // Boca entreaberta de satisfação
        contexto.beginPath();
        contexto.ellipse(x, y + 4, 3.5, 2.5, 0, 0, Math.PI * 2);
        contexto.fillStyle = '#FFFFFF';
        contexto.fill();
        contexto.stroke();

        // Babinha escorrendo no canto direito da boca
        contexto.fillStyle = '#87CEEB'; // Azul claro da saliva
        contexto.beginPath();
        contexto.arc(x + 3.5, y + 6, 1.2, 0, Math.PI * 2);
        contexto.fill();

        contexto.beginPath();
        contexto.arc(x + 4, y + 8.5, 1, 0, Math.PI * 2);
        contexto.fill();
    }

    contexto.restore();
}

function desenharBalao(x, y, largura, altura, alpha) {
    contexto.save();
    contexto.globalAlpha = Math.min(alpha, 1);
    
    // Fundo do Balão
    contexto.fillStyle = '#FFFFFF';
    contexto.strokeStyle = '#000000';
    contexto.lineWidth = 3;

    contexto.beginPath();
    if (contexto.roundRect) {
        contexto.roundRect(x, y, largura, altura, 10);
    } else {
        contexto.rect(x, y, largura, altura);
    }
    contexto.fill();
    contexto.stroke();

    // Rabicho do balão apontando para a cabeça
    contexto.beginPath();
    contexto.moveTo(x + 100, y + altura);
    contexto.lineTo(x + 125, y + altura + 20);
    contexto.lineTo(x + 115, y + altura);
    contexto.fill();
    contexto.stroke();

    // Texto
    contexto.fillStyle = '#000000';
    contexto.font = 'bold 14px sans-serif';
    contexto.textAlign = 'center';
    contexto.textBaseline = 'middle';
    contexto.fillText("ai que delicia cara", x + largura / 2, y + altura / 2);

    contexto.restore();
}

function desenhar(timestamp) {
    if (!tempoInicial) tempoInicial = timestamp;

    let tempoDecorrido = timestamp - tempoInicial;
    
    // Coordenadas padrão dos braços e cabeça
    let cotoveloEsqX = 220, cotoveloEsqY = 330;
    let maoEsqX = 258, maoEsqY = 347;

    let cotoveloDirX = 280, cotoveloDirY = 330;
    let maoDirX = 310, maoDirY = 301;

    let cabecaX = 255, cabecaY = 283;
    let estadoRosto = 'normal';

    // FASE 1: Subida do braço direito (0s a 2.5s) -> Expressão Normal
    if (tempoDecorrido < DURACAO_SUBIDA) {
        let p = tempoDecorrido / DURACAO_SUBIDA;
        maoDirX = 310 + (259 - 310) * p;
        maoDirY = 301 + (400 - 301) * p;
        estadoRosto = 'normal';
    }
    // FASE 2: Aceno e Jato (2.5s a 13s) -> Expressão de Esforço
    else if (tempoDecorrido < DURACAO_SUBIDA + DURACAO_ACENO) {
        let tempoAceno = tempoDecorrido - DURACAO_SUBIDA;
        let progressoAceno = tempoAceno / DURACAO_ACENO;
        
        let envelopeVelocidade = Math.sin(progressoAceno * Math.PI);
        aceno += envelopeVelocidade * 1;

        maoDirX = 259 + Math.sin(aceno) * 5 * envelopeVelocidade;
        maoDirY = 400 + Math.sin(aceno) * 15 * envelopeVelocidade;
        estadoRosto = 'esforco';
    }
    // FASE 3: Relaxar braços + inclinar cabeça (13s em diante) -> Expressão de Satisfação
    else {
        estadoRosto = 'satisfacao';
        let pAbrir = Math.min((tempoDecorrido - (DURACAO_SUBIDA + DURACAO_ACENO)) / DURACAO_ABRIR, 1);

        // Transição do Braço Esquerdo
        cotoveloEsqX = 220 + (215 - 220) * pAbrir;
        cotoveloEsqY = 330 + (335 - 330) * pAbrir;
        maoEsqX = 258 + (185 - 258) * pAbrir;
        maoEsqY = 347 + (365 - 347) * pAbrir;

        // Transição do Braço Direito
        cotoveloDirX = 280 + (285 - 280) * pAbrir;
        cotoveloDirY = 330 + (335 - 330) * pAbrir;
        maoDirX = 259 + (315 - 259) * pAbrir;
        maoDirY = 400 + (365 - 400) * pAbrir;

        // Cabeça inclina para a esquerda
        cabecaX = 255 + (238 - 255) * pAbrir;
        cabecaY = 283 + (286 - 283) * pAbrir;
    }

    // CONTROLE DO JATO (8.5s a 13s)
    if (tempoDecorrido >= TEMPO_INICIO_JATO && tempoDecorrido <= TEMPO_FIM_JATO) {
        emitirJato(260, 415, 8);
    }

    contexto.clearRect(0, 0, canvas.width, canvas.height);

    contexto.lineWidth = 6;
    contexto.lineCap = 'round';
    contexto.lineJoin = 'round';

    // 1. Pernas e Tronco
    contexto.beginPath();
    contexto.moveTo(220, 450);
    contexto.lineTo(222, 400);
    contexto.lineTo(250, 370);
    contexto.lineTo(250, 300); // Pescoço
    contexto.stroke();

    contexto.beginPath();
    contexto.moveTo(250, 370);
    contexto.lineTo(280, 400);
    contexto.lineTo(282, 450);
    contexto.stroke();

    // 2. Braço Esquerdo
    contexto.beginPath();
    contexto.moveTo(250, 300);
    contexto.lineTo(cotoveloEsqX, cotoveloEsqY);
    contexto.lineTo(maoEsqX, maoEsqY);
    contexto.stroke();

    // 3. Braço Direito
    contexto.beginPath();
    contexto.moveTo(250, 300);
    contexto.lineTo(cotoveloDirX, cotoveloDirY);
    contexto.lineTo(maoDirX, maoDirY);
    contexto.stroke();

    // 4. Cabeça e Rosto
    contexto.beginPath();
    contexto.arc(cabecaX, cabecaY, 17, 0, Math.PI * 2);
    contexto.stroke();

    // Desenha a expressão atual do rosto
    desenharRosto(cabecaX, cabecaY, estadoRosto);

    // Detalhes do corpo
    contexto.beginPath();
    contexto.arc(247, 380, 4, 0, Math.PI * 2);
    contexto.arc(253, 380, 4, 0, Math.PI * 2);
    contexto.fill();

    // Linha de origem do jato
    contexto.beginPath();
    contexto.moveTo(250, 380);
    contexto.lineTo(260, 415);
    contexto.stroke();

    // 5. Partículas do Jato
    for (let i = particulas.length - 1; i >= 0; i--) {
        let p = particulas[i];

        contexto.save();
        contexto.globalAlpha = p.alpha;
        contexto.fillStyle = p.cor;
        contexto.beginPath();
        contexto.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        contexto.fill();
        contexto.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            particulas.splice(i, 1);
        }
    }

    // 6. Balão de Fala
    if (tempoDecorrido > 14000) {
        let alphaBalao = (tempoDecorrido - 14000) / 1000;
        desenharBalao(100, 190, 160, 45, alphaBalao);
    }

    requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);