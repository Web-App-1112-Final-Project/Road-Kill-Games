import playGame from "./game.js"
import { player, startAction } from "./player.js"

const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const gameArea = document.querySelector('.gameArea')

const start = () => {
  console.log('start')
  startScreen.classList.toggle('hide')
  gameArea.classList.toggle('hide')
  player.dispatch(startAction())
  window.requestAnimationFrame(playGame)
}


startScreen.addEventListener('click', start)
// document.addEventListener('keydown', pressOn)
// document.addEventListener('keyup', pressOff)


