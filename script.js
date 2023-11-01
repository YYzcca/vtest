const canvas = document.querySelector('#game')
const context = canvas.getContext('2d')
const body = document.querySelector('body')
const span = document.querySelector('span')
const grid = 10
const N = 30
let player = {"row":15, "col":15}
let food = {"row":10, "col":10}
let wall = {"row":28, "col":28}
let direction = "right"
let count = 0
const shab = `<p>Game over</p>`;
const btn = `<button>начать заново</button>`;
let tcount = 11
let inCount = 0

function loop() {
    rAF = requestAnimationFrame(loop)

    context.clearRect(0,0, canvas.width, canvas.height)

    if (++count == tcount){
        if (direction == "right") player.col++
        if (direction == "left") player.col--
        if (direction == "up") player.row--
        if (direction == "down") player.row++

        count = 0
    }
    
    if (food.row == player.row && food.col == player.col){
        food.row = Math.floor(Math.random()*N)
        food.col = Math.floor(Math.random()*N)
        wall.row = Math.floor(Math.random()*N)
        wall.col = Math.floor(Math.random()*N)
        if (parseInt(span.innerText) % 2 === 0){
            tcount--
        }
        console.log(tcount);
        if (tcount < 1){
            tcount = 1
        }
        inCount++
        span.innerText = ("00" + inCount)
    }

    if (wall.row == player.row && wall.col == player.col){
        cancelAnimationFrame(rAF)
        body.insertAdjacentHTML('beforeend', shab);
        body.insertAdjacentHTML('beforeend', btn);
        res()
    }

    if (player.row > (N - 1) || player.col > (N - 1) || player.col < 0 || player.row < 0){
        cancelAnimationFrame(rAF)
        body.insertAdjacentHTML('beforeend', shab);
        body.insertAdjacentHTML('beforeend', btn);
        res()
    }

    //player
    context.fillStyle = "yellow"
    context.fillRect(player.col * grid, player.row * grid, grid - 1, grid -1)

    //food
    context.fillStyle = "green"
    context.fillRect(food.col * grid, food.row * grid, grid - 1, grid -1)
    
    //wall
    context.fillStyle = "red"
    context.fillRect(wall.col * grid, wall.row * grid, grid - 1, grid -1)
}

function res() {
    const rBtn = document.querySelector('button')
    rBtn.addEventListener('click', () => {location.reload()})
}

document.addEventListener('keydown', (e) => {
    if (e.which == 37) direction = "left"
    if (e.which == 39) direction = "right"
    if (e.which == 38) direction = "up"
    if (e.which == 40) direction = "down"
    if (e.which == 65) direction = "left"
    if (e.which == 68) direction = "right"
    if (e.which == 87) direction = "up"
    if (e.which == 83) direction = "down"
})

rAF = requestAnimationFrame(loop)
