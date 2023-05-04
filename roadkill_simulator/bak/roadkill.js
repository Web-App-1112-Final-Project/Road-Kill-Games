

const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')

const player = { start: false, speed: 5 }

let keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}

const start = () => {
  startScreen.classList.toggle('hide')
  gameArea.classList.toggle('hide')
  player.start = true
  window.requestAnimationFrame(playGame)

  let car = document.createElement('div')
  car.innerHTML = 'car'
  car.setAttribute('class', 'car')
  gameArea.appendChild(car)
  player.x = car.offsetLeft
  player.y = car.offsetTop
}

const pressOn = (e) => {
  e.preventDefault()
  keys[e.key] = true
  console.log(keys)

}
const pressOff = (e) => {
  e.preventDefault()
  keys[e.key] = false
  console.log(keys)
}

const playGame = () => {
  let car = document.querySelector('.car')
  if (player.start) {
    if (keys.ArrowUp) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight) {
      player.x += player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
    window.requestAnimationFrame(playGame);
  }
}


startScreen.addEventListener('click', start)
document.addEventListener('keydown', pressOn)
document.addEventListener('keyup', pressOff)


