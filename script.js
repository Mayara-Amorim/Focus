const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaComecar = document.querySelector("#alternar-musica")
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true;
const startPauseBT = document.querySelector("#start-pause")
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const iniciarOuPausar = document.querySelector("#start-pause span")
const img = document.querySelector("#start-pause img")
const tempoNaTela = document.querySelector("#timer")


let intervaloId = null;
let temporizadorSegundos = 1500;//tempo em segundos igual a 25 min.


musicaComecar.addEventListener("change", ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    temporizadorSegundos = 1500
   alterarContexto('foco') //aqui eu removi todos os active e coloco apenas onde foi clicado. Em cada chamada da função alterar contexto eu os removo e add novamente
   focoBt.classList.add('active')
})
curtoBt.addEventListener('click', ()=>{
    temporizadorSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
longoBt.addEventListener('click', ()=>{
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', '/imagens/descanso-longo.png')
    temporizadorSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto){ 
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
   
    switch (contexto) {
        case "foco":
            titulo.innerHTML= 
            `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML=
            `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa.</strong>
            `
        break;
        case "descanso-longo":
            
            titulo.innerHTML=
            `
           Hora de voltar a supercie.<br>
            <strong class="app__title-strong">Faça uma pausa.</strong>
            `
            break;
    
        default:
            break;
    }
}
// é o temporizadorSegundos que guarda o valor decorrido não o IntervaloId
const contagemRegressiva = ()=>{
    if (temporizadorSegundos <=0) {
        audioTempoFinalizado.play()
        alert("Tempo finalizado") 
        zerar()
        return
    }
    temporizadorSegundos-=1
    mostrarTempo();
    console.log(temporizadorSegundos);
}
startPauseBT.addEventListener("click", inicio)

function inicio() {
    if (intervaloId) {
        audioPausa.play()
      zerar()  
      return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000 );//Esse metodo recebe 2 parametros:
    //qual função desejamos executar e de quanto em quanto tempo em milisegundos
    iniciarOuPausar.textContent = "Pausar"
    img.setAttribute('src', `/imagens/pause.png`)
    
}
function zerar() {
   clearInterval(intervaloId)//aqui eu vou INTERROMPER a função setInterval
   iniciarOuPausar.textContent = "Continuar"
   img.setAttribute('src', `/imagens/play_arrow.png`)
   intervaloId=null
}

function mostrarTempo(){
    // const tempo = temporizadorSegundos//temporizador é decrementado na fução contagem regressiava, eu vou guardar isso na cost tempo e mostro isso na variaavel que tem
    // // o id do meu elem html(tempoNaTela), mostrando o decremento.
    // tempoNaTela.innerHTML = `${tempo}`
    const tempo = new Date(temporizadorSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second:'2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo(); //escopo glonal