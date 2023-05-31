import keys from "./key.js";
import { player, addScore } from "./player.js"
import { up, down, right, left } from "./player.js"
import { movelines, addlines } from "./lines.js";
import { movebushes, addBushes } from "./bushes.js";
import { moveAnimals, addAnimals } from "./animal.js";


const Nbush = 14
const bush_height_obj = {}
const bush_width_obj = {}
for (let x = 1; x <= Nbush; x++) {
  const image = new Image();
  image.src = `./game/assets/bush${x}.png`;
  image.addEventListener('load', function () {
    const height = image.naturalHeight;
    const width = image.naturalWidth;
    addBushes(x, height / 2, width / 2)
  });
}

addlines()

const initRender = () => {
  // lines on road
  const gameArea = document.querySelector('.gameArea')
  const grassArea = document.querySelector('.grass')
  const modal = document.querySelector('.modal')
  modal.classList.add('hide')

  addAnimals()

  let shadow = document.createElement('img')
  shadow.src = './game/assets/shadow2.png'
  shadow.style.position = 'absolute';
  grassArea.appendChild(shadow);
  shadow.style.left = 0 + 'px' //  -350 px ~ -250px; 250px ~ 350px
  shadow.style.top = 0 + 'px'
  shadow.style.height = 500 + 'px'
  shadow.style.width = 600 + 'px'

  // car
  let car = document.createElement('img')
  car.src = './game/assets/car2.png'
  car.setAttribute('class', 'car')
  gameArea.appendChild(car)
}



const animal_obj = { tiger: '石虎', owl: '領角鴞', butterfly: '小紫斑蝶', crab: '奧氏後相手蟹', 'turtle': '班龜', pangolin: '穿山甲' }


const playGame = (player) => {

  const gameArea = document.querySelector('.gameArea')
  const road = gameArea.getBoundingClientRect()
  const car = document.querySelector('.car')
  const speed = player.getState().player.speed
  const score = document.querySelector('.score')

  movelines(speed)
  movebushes(speed, bush_height_obj, bush_width_obj)
  player = moveAnimals(car, speed, player)

  if (player.getState().player.start) {
    if (keys.getState().key.ArrowUp && player.getState().player.y < road.bottom - car.offsetHeight - road.y) {
      player.dispatch(up())
    }
    if (keys.getState().key.ArrowDown && player.getState().player.y > road.top - road.y) {
      player.dispatch(down())
    }
    if (keys.getState().key.ArrowRight && player.getState().player.x < road.width - car.offsetWidth) {
      player.dispatch(right())
    }
    if (keys.getState().key.ArrowLeft && player.getState().player.x > 0) {
      player.dispatch(left())
    }
    player.dispatch(addScore())
    score.innerHTML = player.getState().player.score

    window.requestAnimationFrame(() => playGame(player))
  }
  else {
    const modal = document.querySelector('.endModal')
    const modalTitle = document.querySelector('.endModalTitle')
    const hittedAnimal = player.getState().player.hit.split('_')[0];

    const hittedAnimalName = animal_obj[hittedAnimal]
    modal.classList.remove('hide')
    modalTitle.innerHTML = `你撞到了「${hittedAnimalName}」`

  }
}


export { initRender }
export default playGame
