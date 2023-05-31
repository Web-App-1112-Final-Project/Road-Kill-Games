import playGame, { initRender } from "./game/game.js"
import { player, startAction, endAction } from "./game/player.js"
import { resetAnimals } from "./game/animal.js"

// const startScreen = document.querySelector('.startScreen')
const modal = document.querySelector('.modal')
const endModal = document.querySelector('.endModal')
const startGameBtn = document.querySelector('.modalBtn.start')
const restartGameBtn = document.querySelector('.modalBtn.restart')
const speedInput = document.querySelector('#speed');
const speedNum = document.querySelector('#speedNum')


const speedOnChange = (e) => {
  speedNum.innerHTML = e.target.value
}

let animationId = 0;
const start = (e) => {
  e.preventDefault()
  console.log('start')

  let speed = parseInt(speedNum.innerHTML)
  modal.classList.add('hide')
  endModal.classList.add('hide')

  const tips = document.querySelector('.tips')
  tips.classList.remove('hide')
  // startScreen.classList.toggle('hide')
  // grassArea.classList.toggle('hide')
  if (animationId === 0) initRender()
  else resetAnimals()

  player.dispatch(startAction({ speed: speed }))
  window.cancelAnimationFrame(animationId);
  animationId = window.requestAnimationFrame(() => playGame(player))
}

speedInput.addEventListener('change', (e) => speedOnChange(e))
startGameBtn.addEventListener('click', start)
restartGameBtn.addEventListener('click', start)
// document.addEventListener('keydown', pressOn)
// document.addEventListener('keyup', pressOff)


