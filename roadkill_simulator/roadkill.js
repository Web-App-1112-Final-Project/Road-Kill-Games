import playGame, { initRender } from "./game/game.js"
import { player, startAction } from "./game/player.js"

const score = document.querySelector('.score')
const startScreen = document.querySelector('.startScreen')
const startGameForm = document.querySelector('#startGame')
const speedInput = document.querySelector('#speed');
const grassArea = document.querySelector('.grass')


const start = (e) => {
  e.preventDefault()
  console.log('start')

  let speed;
  if (e.target[0] === speedInput) {
    speed = parseInt(speedInput.value);
    console.log(`The speed is ${speed}.`);
  }

  startGameForm.classList.toggle('hide')
  startScreen.classList.toggle('hide')
  grassArea.classList.toggle('hide')
  initRender()
  player.dispatch(startAction({ speed: speed }))
  window.requestAnimationFrame(playGame)
}

startGameForm.addEventListener('submit', start)
// document.addEventListener('keydown', pressOn)
// document.addEventListener('keyup', pressOff)


