'use strict'

// Cria o canvas
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 512
canvas.height = 480
document.body.appendChild(canvas)

// Cenario 
let bgReady = false
const bgImage = new Image()
bgImage.onload = function() {
    bgReady = true
}
bgImage.src = "img/background.png"

// Herói
let heroReady = false
const heroImage = new Image()
heroImage.onload = function(){
    heroReady = true
} 

heroImage.src = "img/mario.png"

// Estrela
let starReady = false
const starImage = new Image()
starImage.onload = function(){
    starReady = true
}
starImage.src = "img/star.png"

// Objetos do jogo
const hero = {
    speed: 256 // movimento pixels por segundo
}
const star = {}
let starCaught = 0

// Controle Teclado
const keysDown = {}

window.addEventListener('keydown', e =>{
    keysDown[e.keyCode] = true
})

window.addEventListener('keyup', e =>{
    delete keysDown[e.keyCode]
})

// Reseta o jogo quando o jogador pegar a estrela
const reset = function(){
    hero.x = canvas.width / 2
    hero.y = canvas.height / 2

    //Posiciona a estrela randomicamente na tela
    star.x = 32 + (Math.random() * (canvas.width - 80))
    star.y = 32 + (Math.random() * (canvas.height - 80))
}

//Atualiza os objetos do jogo
const update = function (modifier){
    if(87 in keysDown || 38 in keysDown){ // 87 -> Pressionando W = Cima
        hero.y -= hero.speed * modifier
    }
    if(83 in keysDown || 40 in keysDown){ // 83 -> Pressionando S = Baixo
        hero.y += hero.speed * modifier

    }
    if(65 in keysDown || 37 in keysDown){ // 65 -> Pressionando A = Esquerda
        hero.x -= hero.speed * modifier
    }
    if(68 in keysDown || 39 in keysDown){ // 68 -> Pressionando D = Direita
        hero.x += hero.speed * modifier
    }

    // Os personagens se encostaram? 
    if(
        hero.x <= (star.x + 32) 
        && star.x <= (hero.x + 32) 
        && hero.y <= (star.y + 32) 
        && star.y <= (hero.y + 32)
    ) {
        ++starCaught
        reset()
    }
    
}

//Renderiza tudo
const render = function(){
    if(bgReady){
        ctx.drawImage(bgImage, 0, 0)
    }
    if(heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y)
    }
    if(starReady){
        ctx.drawImage(starImage, star.x, star.y)
    }

    // Pontuação
    ctx.fillStyle = 'rgb(250, 250, 250)'
    ctx.font = '24px Helvetica'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('Estrelas coletadas: ' + starCaught, 32, 32)
}

// Controla o loop do jogo
const main = function(){
    const now = Date.now()
    const delta = now - then;

    update(delta / 1000)
    render()

    then = now

    // Executa isso o mais reve possível
    requestAnimationFrame(main)
}
// Suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame

// Que comece o jogo!
let then = Date.now()
reset()
main()