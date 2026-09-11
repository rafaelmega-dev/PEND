const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');


    contexto.lineWidth = 6;
    contexto.lineCap = 'round';
    contexto.lineJoin = 'round';

    contexto.beginPath();
    contexto.moveTo(220, 450);
    contexto.lineTo(222, 400);
    contexto.lineTo(250, 370);
    contexto.lineTo(250, 300);
    contexto.lineTo(220, 330);
    contexto.lineTo(258, 347);
    contexto.stroke();

    contexto.beginPath();
    contexto.moveTo(250, 300);
    contexto.lineTo(280, 330);
    contexto.lineTo(310, 301);
    contexto.stroke();

    contexto.beginPath();
    contexto.moveTo(250, 370);
    contexto.lineTo(280, 400);
    contexto.lineTo(282, 450);
    contexto.stroke();

    contexto.beginPath();
    contexto.arc(255, 283, 17, 0, Math.PI * 2);
    contexto.stroke();

  

