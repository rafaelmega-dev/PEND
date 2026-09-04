
const video = document.getElementById("webcam");
const canvas = document.getElementById("canvasOverlay");
const ctx = canvas.getContext("2d");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");

const btnContinuar = document.getElementById("btnContinuar");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnLimpar = document.getElementById("btnLimpar");

const dadosPessoais = document.getElementById("dadosPessoais");
const capturaFacial = document.getElementById("capturaFacial");
const conclusao = document.getElementById("conclusao");

const etapa1 = document.getElementById("etapa1");
const etapa2 = document.getElementById("etapa2");
const etapa3 = document.getElementById("etapa3");

const status = document.getElementById("status");
const cameraStatus = document.getElementById("cameraStatus");

const endereco = document.getElementById("endereco");
const coordenadas = document.getElementById("coordenadas");
const statusLocalizacao = document.getElementById("statusLocalizacao");

const fraseCaptcha = document.getElementById("fraseCaptcha");
const btnMicrofone = document.getElementById("btnMicrofone");
const btnNovaFrase = document.getElementById("btnNovaFrase");
const captchaResultado = document.getElementById("captchaResultado");
const microfoneStatus = document.getElementById("microfoneStatus");

const listaRostos = document.getElementById("listaRostos");
const contadorRegistros = document.getElementById("contadorRegistros");

let stream = null;
let streamConsulta = null;
let localizacaoAtual = null;
let fraseAtual = "";
let reconhecimentoVoz = null;
let captchaAprovado = false;

let rostosSalvos = JSON.parse(
    localStorage.getItem("bancoRostosOffline")
) || [];


/* =====================================================
   LOCALIZAÇÃO
===================================================== */

function obterLocalizacao() {

    if (!navigator.geolocation) {

        statusLocalizacao.textContent =
            "Geolocalização não disponível";

        return;
    }

    statusLocalizacao.textContent =
        "Obtendo localização...";

    navigator.geolocation.getCurrentPosition(

        async function (position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            localizacaoAtual = {
                latitude: lat,
                longitude: lon
            };

            coordenadas.textContent =
                `Latitude: ${lat.toFixed(6)} • Longitude: ${lon.toFixed(6)}`;

            try {

                const resposta = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pt-BR`
                );

                const dados = await resposta.json();

                if (dados.display_name) {

                    endereco.textContent =
                        dados.display_name;

                    statusLocalizacao.textContent =
                        "Localização identificada";

                } else {

                    endereco.textContent =
                        "Localização identificada";

                    statusLocalizacao.textContent =
                        "Coordenadas obtidas";
                }

            } catch (erro) {

                endereco.textContent =
                    "Localização identificada pelas coordenadas";

                statusLocalizacao.textContent =
                    "Coordenadas obtidas";
            }
        },

        function () {

            statusLocalizacao.textContent =
                "Não foi possível obter a localização";

            endereco.textContent =
                "Localização não autorizada";

            coordenadas.textContent =
                "Você pode continuar sem informar sua localização.";
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


/* =====================================================
   CÂMERA DO CADASTRO
===================================================== */

async function iniciarCamera() {

    try {

        stream = await navigator.mediaDevices.getUserMedia({

            video: {
                width: 640,
                height: 480,
                facingMode: "user"
            },

            audio: false
        });

        video.srcObject = stream;

        cameraStatus.textContent =
            "Câmera ativa • Posicione seu rosto no centro";

    } catch (erro) {

        cameraStatus.textContent =
            "Não foi possível acessar a câmera";

        mostrarStatus(
            "Permita o acesso à câmera para realizar a validação facial.",
            "erro"
        );
    }
}


/* =====================================================
   ASSINATURA VISUAL
===================================================== */

function extrairAssinaturaVisual() {

    const largura = 320;
    const altura = 240;

    canvas.width = largura;
    canvas.height = altura;

    ctx.drawImage(
        video,
        (video.videoWidth - largura) / 2,
        (video.videoHeight - altura) / 2,
        largura,
        altura,
        0,
        0,
        largura,
        altura
    );

    const imagem = ctx.getImageData(
        0,
        0,
        largura,
        altura
    );

    const assinatura = [];

    const tamanhoBloco = 32;

    for (
        let y = 0;
        y < altura;
        y += tamanhoBloco
    ) {

        for (
            let x = 0;
            x < largura;
            x += tamanhoBloco
        ) {

            let soma = 0;
            let quantidade = 0;

            for (
                let py = y;
                py < Math.min(
                    y + tamanhoBloco,
                    altura
                );
                py++
            ) {

                for (
                    let px = x;
                    px < Math.min(
                        x + tamanhoBloco,
                        largura
                    );
                    px++
                ) {

                    const indice =
                        (py * largura + px) * 4;

                    const r =
                        imagem.data[indice];

                    const g =
                        imagem.data[indice + 1];

                    const b =
                        imagem.data[indice + 2];

                    const cinza =
                        (r * 0.299) +
                        (g * 0.587) +
                        (b * 0.114);

                    soma += cinza;

                    quantidade++;
                }
            }

            assinatura.push(
                Math.round(
                    soma / quantidade
                )
            );
        }
    }

    return assinatura;
}


/* =====================================================
   REGISTRO FACIAL
===================================================== */

btnRegistrar.addEventListener(
    "click",
    function () {

        const nome =
            nomeInput.value.trim();

        const email =
            emailInput.value.trim();

        if (!nome || !email) {

            mostrarStatus(
                "Preencha nome e e-mail antes de registrar sua imagem.",
                "erro"
            );

            return;
        }

        if (!stream) {

            mostrarStatus(
                "A câmera ainda não está disponível.",
                "erro"
            );

            return;
        }

        const perfil =
            extrairAssinaturaVisual();

        const registro = {

            id: Date.now(),

            nome: nome,

            email: email,

            perfil: perfil,

            localizacao: localizacaoAtual,

            endereco:
                endereco.textContent,

            data:
                new Date().toLocaleString("pt-BR")
        };

        rostosSalvos.push(registro);

        localStorage.setItem(
            "bancoRostosOffline",
            JSON.stringify(rostosSalvos)
        );

        captchaAprovado = false;

        mostrarStatus(
            "Imagem facial registrada. Agora realize a prova de presença por voz.",
            "sucesso"
        );

        cameraStatus.textContent =
            "Imagem facial registrada";

        etapa2.classList.add("concluida");

        etapa3.classList.add("ativa");

        gerarFraseCaptcha();

        
    }
);


/* =====================================================
   RECONHECIMENTO FACIAL
===================================================== */

function reconhecerRosto(
    assinaturaAtual
) {

    let melhorResultado = null;

    let menorDistancia =
        Infinity;

    rostosSalvos.forEach(
        function (registro) {

            if (
                !registro.perfil ||
                registro.perfil.length !==
                assinaturaAtual.length
            ) {
                return;
            }

            let distancia = 0;

            for (
                let i = 0;
                i < assinaturaAtual.length;
                i++
            ) {

                distancia += Math.abs(
                    assinaturaAtual[i] -
                    registro.perfil[i]
                );
            }

            if (
                distancia <
                menorDistancia
            ) {

                menorDistancia =
                    distancia;

                melhorResultado =
                    registro;
            }
        }
    );

    if (
        melhorResultado &&
        menorDistancia < 2500
    ) {

        return {
            registro: melhorResultado,
            distancia: menorDistancia
        };
    }

    return null;
}


/* =====================================================
   CAPTCHA DE VOZ
===================================================== */

const frasesCaptcha = [

    "Eu confirmo minha identidade",

    "Estou realizando meu cadastro",

    "Minha identidade está sendo verificada",

    "Eu sou uma pessoa real",

    "Confirmo que estou presente",

    "Estou fazendo uma verificação de segurança",

    "Autorizo a verificação da minha identidade",

    "Estou realizando a validação facial",

    "Confirmo a realização deste cadastro",

    "Minha identidade foi confirmada"
];


function gerarFraseCaptcha() {

    let novaFrase;

    do {

        novaFrase =
            frasesCaptcha[
                Math.floor(
                    Math.random() *
                    frasesCaptcha.length
                )
            ];

    } while (
        novaFrase === fraseAtual &&
        frasesCaptcha.length > 1
    );

    fraseAtual =
        novaFrase;

    fraseCaptcha.textContent =
        fraseAtual;

    captchaAprovado =
        false;

    captchaResultado.className =
        "resultado-voz";

    captchaResultado.textContent =
        "A validação por voz é necessária para concluir o cadastro.";
}


function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /[.,!?;:]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
}


function compararFrase(
    fraseFalada,
    fraseEsperada
) {

    const falada =
        normalizarTexto(
            fraseFalada
        );

    const esperada =
        normalizarTexto(
            fraseEsperada
        );

    if (
        falada === esperada
    ) {
        return true;
    }

    const palavrasEsperadas =
        esperada.split(" ");

    const palavrasFaladas =
        falada.split(" ");

    let palavrasCorretas = 0;

    palavrasEsperadas.forEach(
        function (palavra) {

            if (
                palavrasFaladas.includes(
                    palavra
                )
            ) {
                palavrasCorretas++;
            }
        }
    );

    const porcentagem =
        palavrasCorretas /
        palavrasEsperadas.length;

    return porcentagem >= 0.75;
}


/* =====================================================
   SPEECH RECOGNITION
===================================================== */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    reconhecimentoVoz =
        new SpeechRecognition();

    reconhecimentoVoz.lang =
        "pt-BR";

    reconhecimentoVoz.continuous =
        false;

    reconhecimentoVoz.interimResults =
        false;

    reconhecimentoVoz.maxAlternatives =
        1;


    reconhecimentoVoz.onstart =
        function () {

            microfoneStatus.classList.add(
                "ativo"
            );

            microfoneStatus.classList.remove(
                "sucesso"
            );

            microfoneStatus.innerHTML =
                "<span></span> Ouvindo...";

            btnMicrofone.disabled =
                true;

            btnMicrofone.innerHTML =
                '<span class="icone-microfone">●</span> Ouvindo...';

            captchaResultado.className =
                "resultado-voz";

            captchaResultado.textContent =
                "Fale a frase apresentada acima.";
        };


    reconhecimentoVoz.onresult =
        function (event) {

            const textoReconhecido =
                event.results[0][0]
                    .transcript;

            const acertou =
                compararFrase(
                    textoReconhecido,
                    fraseAtual
                );

            if (acertou) {

                captchaAprovado =
                    true;

                microfoneStatus.classList.remove(
                    "ativo"
                );

                microfoneStatus.classList.add(
                    "sucesso"
                );

                microfoneStatus.innerHTML =
                    "<span></span> Verificado";

                captchaResultado.className =
                    "resultado-voz sucesso";

                captchaResultado.innerHTML =
                    "✓ Prova de presença confirmada. Frase reconhecida corretamente.";

                btnMicrofone.disabled =
                    true;

                btnMicrofone.innerHTML =
                    "✓ Validação concluída";

                etapa3.classList.add(
                    "concluida"
                );

                concluirCadastro();

            } else {

                captchaAprovado =
                    false;

                microfoneStatus.classList.remove(
                    "ativo"
                );

                captchaResultado.className =
                    "resultado-voz erro";

                captchaResultado.innerHTML =
                    `A frase não foi reconhecida corretamente.<br>
                    <small>Você disse: "${escaparHTML(textoReconhecido)}"</small>`;

                btnMicrofone.disabled =
                    false;

                btnMicrofone.innerHTML =
                    '<span class="icone-microfone">●</span> Tentar novamente';
            }
        };


    reconhecimentoVoz.onerror =
        function (event) {

            microfoneStatus.classList.remove(
                "ativo"
            );

            microfoneStatus.innerHTML =
                "<span></span> Microfone";

            btnMicrofone.disabled =
                false;

            btnMicrofone.innerHTML =
                '<span class="icone-microfone">●</span> Iniciar validação';


            if (
                event.error ===
                "not-allowed"
            ) {

                captchaResultado.className =
                    "resultado-voz erro";

                captchaResultado.textContent =
                    "O acesso ao microfone foi bloqueado. Autorize o microfone no navegador.";

            } else if (
                event.error ===
                "no-speech"
            ) {

                captchaResultado.className =
                    "resultado-voz erro";

                captchaResultado.textContent =
                    "Nenhuma fala foi detectada. Tente novamente.";

            } else {

                captchaResultado.className =
                    "resultado-voz erro";

                captchaResultado.textContent =
                    "Ocorreu um erro durante a validação por voz.";
            }
        };


    reconhecimentoVoz.onend =
        function () {

            if (!captchaAprovado) {

                microfoneStatus.classList.remove(
                    "ativo"
                );

                microfoneStatus.innerHTML =
                    "<span></span> Microfone";

                btnMicrofone.disabled =
                    false;

                btnMicrofone.innerHTML =
                    '<span class="icone-microfone">●</span> Iniciar validação';
            }
        };

} else {

    btnMicrofone.disabled =
        true;

    captchaResultado.className =
        "resultado-voz erro";

    captchaResultado.textContent =
        "Seu navegador não oferece suporte à validação de voz.";
}


/* =====================================================
   MICROFONE
===================================================== */

btnMicrofone.addEventListener(
    "click",
    function () {

        if (!reconhecimentoVoz) {
            return;
        }

        if (!fraseAtual) {
            gerarFraseCaptcha();
        }

        try {

            reconhecimentoVoz.start();

        } catch (erro) {

            console.log(
                "Reconhecimento já iniciado."
            );
        }
    }
);


btnNovaFrase.addEventListener(
    "click",
    function () {

        if (
            reconhecimentoVoz &&
            !btnMicrofone.disabled
        ) {
            gerarFraseCaptcha();
        }
    }
);


/* =====================================================
   CONCLUSÃO
===================================================== */

function concluirCadastro() {

    if (!captchaAprovado) {
        return;
    }

    setTimeout(
        function () {

            capturaFacial.classList.add(
                "escondida"
            );

            conclusao.classList.remove(
                "escondida"
            );

            document.getElementById(
                "resumoNome"
            ).textContent =
                nomeInput.value;

            document.getElementById(
                "resumoEmail"
            ).textContent =
                emailInput.value;

            document.getElementById(
                "resumoLocalizacao"
            ).textContent =
                endereco.textContent;

            etapa1.classList.add(
                "concluida"
            );

            etapa2.classList.add(
                "concluida"
            );

            etapa3.classList.add(
                "concluida"
            );

            conclusao.scrollIntoView({
                behavior: "smooth"
            });

        },
        800
    );
}


/* =====================================================
   CONTINUAR
===================================================== */

btnContinuar.addEventListener(
    "click",
    function () {

        const nome =
            nomeInput.value.trim();

        const email =
            emailInput.value.trim();

        if (!nome) {

            mostrarStatus(
                "Informe seu nome completo.",
                "erro"
            );

            nomeInput.focus();

            return;
        }

        if (
            !email ||
            !email.includes("@")
        ) {

            mostrarStatus(
                "Informe um e-mail válido.",
                "erro"
            );

            emailInput.focus();

            return;
        }

        dadosPessoais.classList.add(
            "escondida"
        );

        capturaFacial.classList.remove(
            "escondida"
        );

        etapa1.classList.remove(
            "ativa"
        );

        etapa1.classList.add(
            "concluida"
        );

        etapa2.classList.add(
            "ativa"
        );

        iniciarCamera();

        capturaFacial.scrollIntoView({
            behavior: "smooth"
        });
    }
);


/* =====================================================
   LIMPAR REGISTROS
===================================================== */

btnLimpar.addEventListener(
    "click",
    function () {

        if (
            !confirm(
                "Deseja realmente apagar todos os registros?"
            )
        ) {
            return;
        }

        rostosSalvos = [];

        localStorage.removeItem(
            "bancoRostosOffline"
        );

        atualizarLista();

        mostrarStatus(
            "Todos os registros foram removidos.",
            "sucesso"
        );
    }
);


/* =====================================================
   LISTA DE REGISTROS
===================================================== */

function atualizarLista() {

    contadorRegistros.textContent =
        `${rostosSalvos.length} ${
            rostosSalvos.length === 1
                ? "registro"
                : "registros"
        }`;

    if (
        rostosSalvos.length === 0
    ) {

        listaRostos.textContent =
            "Nenhuma identidade registrada.";

        return;
    }

    listaRostos.innerHTML = "";

    rostosSalvos.forEach(
        function (registro) {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "registro";

            item.innerHTML = `
                <div>
                    <strong>${escaparHTML(registro.nome)}</strong>
                    <small>${escaparHTML(registro.email)}</small>
                </div>

                <small>
                    ${escaparHTML(registro.data)}
                </small>
            `;

            listaRostos.appendChild(
                item
            );
        }
    );
}


/* =====================================================
   CONSULTA POR BIOMETRIA FACIAL
===================================================== */

const btnModoCadastro =
    document.getElementById(
        "btnModoCadastro"
    );

const btnModoConsulta =
    document.getElementById(
        "btnModoConsulta"
    );

const areaCadastro =
    document.getElementById(
        "areaCadastro"
    );

const areaConsulta =
    document.getElementById(
        "areaConsulta"
    );

const webcamConsulta =
    document.getElementById(
        "webcamConsulta"
    );

const canvasConsulta =
    document.getElementById(
        "canvasConsulta"
    );

const ctxConsulta =
    canvasConsulta.getContext("2d");

const btnIniciarConsulta =
    document.getElementById(
        "btnIniciarConsulta"
    );

const btnConsultar =
    document.getElementById(
        "btnConsultar"
    );

const consultaCameraStatus =
    document.getElementById(
        "consultaCameraStatus"
    );

const statusConsulta =
    document.getElementById(
        "statusConsulta"
    );

const dadosConsulta =
    document.getElementById(
        "dadosConsulta"
    );


/* ALTERNAR ENTRE CADASTRO E CONSULTA */

btnModoCadastro.addEventListener(
    "click",
    function () {

        btnModoCadastro.classList.add(
            "ativo"
        );

        btnModoConsulta.classList.remove(
            "ativo"
        );

        areaCadastro.classList.remove(
            "escondida"
        );

        areaConsulta.classList.add(
            "escondida"
        );

        pararCameraConsulta();
    }
);


btnModoConsulta.addEventListener(
    "click",
    function () {

        btnModoConsulta.classList.add(
            "ativo"
        );

        btnModoCadastro.classList.remove(
            "ativo"
        );

        areaCadastro.classList.add(
            "escondida"
        );

        areaConsulta.classList.remove(
            "escondida"
        );

        areaConsulta.scrollIntoView({
            behavior: "smooth"
        });
    }
);


/* =====================================================
   ATIVAR CÂMERA DA CONSULTA
===================================================== */

async function iniciarCameraConsulta() {

    if (rostosSalvos.length === 0) {

        mostrarResultadoConsulta(
            "Nenhuma identidade está cadastrada neste dispositivo."
        );

        return;
    }

    try {

        streamConsulta =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    width: 640,
                    height: 480,
                    facingMode: "user"
                },

                audio: false
            });

        webcamConsulta.srcObject =
            streamConsulta;

        consultaCameraStatus.textContent =
            "Câmera ativa • Posicione seu rosto no centro";

        statusConsulta.textContent =
            "Pronto para reconhecimento";

    } catch (erro) {

        consultaCameraStatus.textContent =
            "Não foi possível acessar a câmera";

        statusConsulta.textContent =
            "Câmera indisponível";

        mostrarResultadoConsulta(
            "Permita o acesso à câmera para realizar a consulta facial."
        );
    }
}


btnIniciarConsulta.addEventListener(
    "click",
    iniciarCameraConsulta
);


/* =====================================================
   EXTRAIR ASSINATURA DA CÂMERA DE CONSULTA
===================================================== */

function extrairAssinaturaConsulta() {

    const largura = 320;
    const altura = 240;

    canvasConsulta.width =
        largura;

    canvasConsulta.height =
        altura;

    ctxConsulta.drawImage(
        webcamConsulta,
        (
            webcamConsulta.videoWidth -
            largura
        ) / 2,
        (
            webcamConsulta.videoHeight -
            altura
        ) / 2,
        largura,
        altura,
        0,
        0,
        largura,
        altura
    );

    const imagem =
        ctxConsulta.getImageData(
            0,
            0,
            largura,
            altura
        );

    const assinatura = [];

    const tamanhoBloco = 32;

    for (
        let y = 0;
        y < altura;
        y += tamanhoBloco
    ) {

        for (
            let x = 0;
            x < largura;
            x += tamanhoBloco
        ) {

            let soma = 0;
            let quantidade = 0;

            for (
                let py = y;
                py < Math.min(
                    y + tamanhoBloco,
                    altura
                );
                py++
            ) {

                for (
                    let px = x;
                    px < Math.min(
                        x + tamanhoBloco,
                        largura
                    );
                    px++
                ) {

                    const indice =
                        (py * largura + px) * 4;

                    const r =
                        imagem.data[indice];

                    const g =
                        imagem.data[indice + 1];

                    const b =
                        imagem.data[indice + 2];

                    const cinza =
                        (r * 0.299) +
                        (g * 0.587) +
                        (b * 0.114);

                    soma += cinza;

                    quantidade++;
                }
            }

            assinatura.push(
                Math.round(
                    soma / quantidade
                )
            );
        }
    }

    return assinatura;
}


/* =====================================================
   CONSULTAR IDENTIDADE
===================================================== */

btnConsultar.addEventListener(
    "click",
    function () {

        if (!streamConsulta) {

            statusConsulta.textContent =
                "Câmera não ativada";

            mostrarResultadoConsulta(
                "Clique em “Ativar câmera” antes de realizar a consulta."
            );

            return;
        }

        if (
            !webcamConsulta.videoWidth ||
            !webcamConsulta.videoHeight
        ) {

            mostrarResultadoConsulta(
                "A câmera ainda está inicializando. Aguarde alguns segundos."
            );

            return;
        }

        statusConsulta.textContent =
            "Analisando imagem facial...";

        consultaCameraStatus.textContent =
            "Analisando face...";

        btnConsultar.disabled = true;

        setTimeout(
            function () {

                const assinatura =
                    extrairAssinaturaConsulta();

                const resultado =
                    reconhecerRosto(
                        assinatura
                    );

                btnConsultar.disabled =
                    false;

                if (resultado) {

                    exibirIdentidadeEncontrada(
                        resultado.registro,
                        resultado.distancia
                    );

                    statusConsulta.textContent =
                        "Identidade reconhecida";

                    consultaCameraStatus.textContent =
                        "Face reconhecida";

                } else {

                    statusConsulta.textContent =
                        "Identidade não encontrada";

                    consultaCameraStatus.textContent =
                        "Nenhuma correspondência encontrada";

                    mostrarResultadoConsulta(
                        "Não foi possível encontrar uma identidade correspondente à face apresentada."
                    );
                }

            },
            500
        );
    }
);


/* =====================================================
   EXIBIR IDENTIDADE ENCONTRADA
===================================================== */

function exibirIdentidadeEncontrada(
    registro,
    distancia
) {

    const local =
        registro.endereco ||
        "Localização não registrada";

    dadosConsulta.innerHTML = `

        <div class="identidade-encontrada">

            <div class="identidade-status">
                ✓ IDENTIDADE RECONHECIDA
            </div>

            <div class="identidade-dados">

                <div>
                    <span>Nome completo</span>
                    <strong>
                        ${escaparHTML(registro.nome)}
                    </strong>
                </div>

                <div>
                    <span>E-mail</span>
                    <strong>
                        ${escaparHTML(registro.email)}
                    </strong>
                </div>

                <div>
                    <span>Localização registrada</span>
                    <strong>
                        ${escaparHTML(local)}
                    </strong>
                </div>

                <div>
                    <span>Cadastro realizado em</span>
                    <strong>
                        ${escaparHTML(registro.data)}
                    </strong>
                </div>

                <div>
                    <span>Status</span>
                    <strong>
                        Cadastro encontrado
                    </strong>
                </div>

            </div>

        </div>
    `;
}


/* =====================================================
   RESULTADO DE ERRO
===================================================== */

function mostrarResultadoConsulta(
    mensagem
) {

    dadosConsulta.innerHTML = `

        <div class="consulta-nao-encontrada">
            ${escaparHTML(mensagem)}
        </div>
    `;
}


/* =====================================================
   PARAR CÂMERA DA CONSULTA
===================================================== */

function pararCameraConsulta() {

    if (streamConsulta) {

        streamConsulta
            .getTracks()
            .forEach(
                function (track) {
                    track.stop();
                }
            );

        streamConsulta = null;

        webcamConsulta.srcObject =
            null;
    }
}


/* =====================================================
   SEGURANÇA CONTRA HTML
===================================================== */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");

    elemento.textContent =
        texto || "";

    return elemento.innerHTML;
}


/* =====================================================
   STATUS
===================================================== */

function mostrarStatus(
    mensagem,
    tipo
) {

    status.textContent =
        mensagem;

    status.className =
        `mensagem-status ${tipo}`;

    setTimeout(
        function () {

            status.className =
                "mensagem-status";

        },
        5000
    );
}


/* =====================================================
   NOVO CADASTRO
===================================================== */

document.getElementById(
    "btnNovoCadastro"
).addEventListener(
    "click",
    function () {

        conclusao.classList.add(
            "escondida"
        );

        dadosPessoais.classList.remove(
            "escondida"
        );

        nomeInput.value = "";
        emailInput.value = "";

        captchaAprovado =
            false;

        etapa1.className =
            "etapa ativa";

        etapa2.className =
            "etapa";

        etapa3.className =
            "etapa";

        gerarFraseCaptcha();

        dadosPessoais.scrollIntoView({
            behavior: "smooth"
        });
    }
);


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

obterLocalizacao();

atualizarLista();

gerarFraseCaptcha();
