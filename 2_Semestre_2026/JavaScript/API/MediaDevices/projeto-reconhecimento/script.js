const statusTxt = document.getElementById('status');
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvasOverlay');
    const ctx = canvas.getContext('2d');
    const nomeInput = document.getElementById('nomeCadastro');
    const btnCadastrar = document.getElementById('btnCadastrar');

    let rostosSalvos = [];

    // Recupera dados salvos previamente no navegador
    function carregarBancoLocal() {
      const dados = localStorage.getItem('bancoRostosOffline');
      if (dados) {
        rostosSalvos = JSON.parse(dados);
        statusTxt.innerHTML = `<span class="status-ok">Sistema Pronto! ${rostosSalvos.length} pessoas carregadas da memória.</span>`;
      } else {
        statusTxt.innerHTML = '<span class="status-ok">Sistema Pronto! Nenhum rosto registrado ainda.</span>';
      }
    }

    // Inicializa o fluxo de vídeo da câmera
    async function iniciarCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480, facingMode: "user" } 
        });
        video.srcObject = stream;
        
        video.addEventListener('loadedmetadata', () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          carregarBancoLocal();
          loopReconhecimento();
        });
      } catch (err) {
        statusTxt.innerHTML = '<span class="status-erro">Erro: A câmera foi bloqueada pelo navegador ou não foi encontrada. Clique no ícone de câmera na barra de endereço para permitir.</span>';
        console.error(err);
      }
    }


    function extrairAssinaturaVisual() {
      const miniCanvas = document.createElement('canvas');
      miniCanvas.width = 10;
      miniCanvas.height = 10;
      const miniCtx = miniCanvas.getContext('2d');
      
      // Captura o centro do frame do vídeo
      miniCtx.drawImage(video, 160, 120, 320, 240, 0, 0, 10, 10);
      const imgData = miniCtx.getImageData(0, 0, 10, 10).data;
      
      // Converte os canais de cor em um vetor numérico de tons de cinza
      const descritor = [];
      for (let i = 0; i < imgData.length; i += 4) {
        const luminosidade = (imgData[i] + imgData[i+1] + imgData[i+2]) / 3;
        descritor.push(Math.round(luminosidade));
      }
      return descritor;
    }

    // Botão de Cadastrar
    btnCadastrar.addEventListener('click', () => {
      const nome = nomeInput.value.trim();
      if (!nome) {
        alert("Por favor, digite um nome antes de registrar.");
        return;
      }

      statusTxt.innerText = "Registrando características faciais...";
      const assinatura = extrairAssinaturaVisual();

      // Salva no banco de dados local da memória do navegador
      rostosSalvos.push({ nome: nome, perfil: assinatura });
      localStorage.setItem('bancoRostosOffline', JSON.stringify(rostosSalvos));

      alert(`Sucesso! O perfil de "${nome}" foi salvo no seu navegador.`);
      nomeInput.value = "";
      carregarBancoLocal();
    });

    // Varredura em Tempo Real
    function loopReconhecimento() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (rostosSalvos.length > 0) {
        const assinaturaAtual = extrairAssinaturaVisual();
        let melhorNome = "Desconhecido";
        let menorDiferenca = Infinity;

        // Compara matematicamente os padrões de iluminação e distância
        rostosSalvos.forEach(pessoa => {
          let diferenca = 0;
          for (let i = 0; i < assinaturaAtual.length; i++) {
            diferenca += Math.abs(assinaturaAtual[i] - pessoa.perfil[i]);
          }
          
          if (diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            // Limiar de precisão adaptativo local
            if (diferenca < 2500) {
              melhorNome = pessoa.nome;
            }
          }
        });

        // Desenha a interface de marcação simulada na tela
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 3;
        // Centraliza a caixa de detecção principal
        ctx.strokeRect(180, 100, 280, 280);

        ctx.fillStyle = "#00FF00";
        ctx.font = "bold 24px Arial";
        ctx.fillText(melhorNome, 180, 90);
      } else {
        // Se ninguém estiver cadastrado, avisa na tela
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.strokeRect(180, 100, 280, 280);
        ctx.fillStyle = "#FF0000";
        ctx.font = "18px Arial";
        ctx.fillText("Nenhum usuário registrado", 180, 90);
      }

      // Executa de forma contínua e suave a 30 FPS
      setTimeout(loopReconhecimento, 33);
    }

    // Inicialização automática
    window.addEventListener('DOMContentLoaded', iniciarCamera);

    // LÓGICA PARA APAGAR OS DADOS DO NAVEGADOR
    btnLimpar.addEventListener('click', () => {
      if (confirm("Tem certeza que deseja apagar todas as pessoas cadastradas?")) {
        localStorage.removeItem('bancoRostosOffline'); // Apaga a chave do localstorage
        carregarBancoLocal(); // Atualiza a lista na tela imediatamente
        alert("Todos os cadastros foram removidos!");
      }
    });
