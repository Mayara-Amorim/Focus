const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaComecar = document.querySelector("#alternar-musica")
const musica = new Audio('/sons/luna-sire-part-one.mp3')
musica.loop = true;

musicaComecar.addEventListener("change", ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
   alterarContexto('foco') //aqui eu removi todos os active e coloco apenas onde foi clicado. Em cada chamada da função alterar contexto eu os removo e add novamente
   focoBt.classList.add('active')
})
curtoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
longoBt.addEventListener('click', ()=>{
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', '/imagens/descanso-longo.png')
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto){ 
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