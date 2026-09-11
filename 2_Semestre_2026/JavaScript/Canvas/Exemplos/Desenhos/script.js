const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

//desenha linhas
contexto.beginPath();
contexto.moveTo(10, 0);
contexto.lineTo(50, 200);
contexto.lineTo(200, 200);
contexto.stroke();

//desenha arcos e circulos
contexto.beginPath();
contexto.arc(250,250,50,0,Math.PI*2);
contexto.fill();

//desenha retângulos e quadrados preenchidos
contexto.fillRect(50, 50, 150, 100);

//desenha retângulos e quadrados não preenchidos, apenas contornos
contexto.strokeRect(250, 50, 150, 100);
