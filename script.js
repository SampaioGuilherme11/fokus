
    // VARIAVEIS

const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const comecaBt = document.querySelector('#start-pause');
const tempo = document.querySelector('#timer');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const banner = document.querySelector('.app__image');
const tempoNaTelaBt = document.querySelector('#timer')
const imagemPause = document.querySelector('.app__card-primary-butto-icon')
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('/sons/play.wav')
const musicaPause = new Audio('/sons/pause.mp3')
const musicaFim = new Audio('/sons/beep.mp3')
musica.loop = true;
let tempoDecorridoEmSegundos = 1800
let intervaloId = null;

    // FUNÇOES

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}    

    // FOCO

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1800
    alterarContexto('foco');
    focoBt.classList.add('active')
})

    // DESCANSO CURTO

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
})

    // DESCANSO LONGO

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 600
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
})

musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused) {
        musica.play();
    }
    else{
        musica.play
            musica.pause();
        }
}  
)

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        musicaFim.play();
        alert('Tempo Finalizado !!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

comecaBt.addEventListener('click', iniciarOuPausar)
    
function iniciarOuPausar () {
    if (intervaloId) {
        musicaPause.play();

        zerar()
        return
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imagemPause.setAttribute('src', 'imagens/pause.png')
}
function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    imagemPause.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTelaBt.innerHTML = `${tempoFormatado}`
}

mostrarTempo()