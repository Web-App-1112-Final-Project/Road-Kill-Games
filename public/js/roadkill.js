import playGame, { initRender } from './game/game.js';
import { player, startAction, resetScore } from './game/player.js';
import { resetAnimals } from './game/animal.js';
import { saveScore as saveApi } from './game/api.js';


// const startScreen = document.querySelector('.startScreen')
const modal = document.querySelector('.modal_game2');
const endModal = document.querySelector('.endModal')
const startGameBtn = document.querySelector('.modalBtn.start')
const restartGameBtn = document.querySelector('.modalBtn.restart')
const saveScoreBtn = document.querySelector('button.save')
const speedInput = document.querySelector('#speed');
const backtoHomeBtnfirst = document.querySelector('.modalBtn.back.first')
const backtoHomeBtndie = document.querySelector('.modalBtn.back.die')
const speedNum = document.querySelector('#speedNum')
const submitCheck = document.querySelector('#submitcheck')


const speedOnChange = (e) => {
  speedNum.innerHTML = parseInt(e.target.value) + 3
}

const saveScoreHandler = async () => {
  const score = document.querySelector('#score')
  const playerNameInput = document.querySelector('#playername')
  const scoreInt = parseInt(score.innerHTML.match(/\d+/)[0])
  const playerName = playerNameInput.value
  try {
    const data = await saveApi({ name: playerName, score: scoreInt })
    submitCheck.classList.remove('opacity')
  } catch {
    console.error('upload failed')
  }
}

const backtoHomeHandler = () => {
  var url = new URL(window.location.href);
  var baseUrl = url.origin + url.pathname.split('/').slice(0, -1).join('/');
  window.location.href = baseUrl
}


let animationId = 0;
const start = (e) => {
  e.preventDefault()
  console.log('start')

  let speed = parseInt(speedNum.innerHTML)
  console.log(speed)
  modal.classList.add('hide')
  endModal.classList.add('hide')

  const tips = document.querySelector('.tips')
  tips.classList.remove('hide')
  if (animationId === 0) initRender()
  else resetAnimals()

  player.dispatch(startAction({ speed: speed }))
  player.dispatch(resetScore())
  window.cancelAnimationFrame(animationId);
  animationId = window.requestAnimationFrame(() => playGame(player))
}

speedInput.addEventListener('change', (e) => speedOnChange(e))
startGameBtn.addEventListener('click', start)
restartGameBtn.addEventListener('click', start)
saveScoreBtn.addEventListener('click', saveScoreHandler)
backtoHomeBtnfirst.addEventListener('click', backtoHomeHandler)
backtoHomeBtndie.addEventListener('click', backtoHomeHandler)

