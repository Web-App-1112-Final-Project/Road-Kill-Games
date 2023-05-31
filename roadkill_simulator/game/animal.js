import { player, endAction, hit } from "./player.js"
const ga = document.querySelector(".gameArea");

const getClipBottom = (clipPathValue) => {
  const valuesArray = clipPathValue.split(' '); // Split the string into an array of values
  const lastValue = valuesArray.pop(); // Remove and return the last value of the array
  const lastNumber = parseFloat(lastValue); // Convert the last value to a number
  return lastNumber
}
const getClipTop = (clipPathValue) => {
  const valuesArray = clipPathValue.slice(6, -1).split(' ');; // Split the string into an array of values
  const firstValue = valuesArray[0]; // Remove and return the last value of the array
  const firstNumber = parseFloat(firstValue); // Convert the last value to a number
  return firstNumber
}

const gameArea = document.querySelector('.gameArea')
// const animal_list = ['butterfly_450_374', 'crab_424_340',
//   'frog_480_344', 'owl_750_884', 'pangolin_340_242', 'turtle_500_325']
const animal_list = ['butterfly_450_374']
const animal_height_obj = {}
const animal_width_obj = {}
for (const ani of animal_list) {
  const image = new Image();
  image.src = `./game/animal_image/${ani}.png`;
  image.addEventListener('load', function () {
    const height = image.naturalHeight;
    const width = image.naturalWidth;
    animal_height_obj[ani] = height / 10
    animal_width_obj[ani] = width / 10
  });
}

function getRandomNumber(width) {
  return Math.floor(Math.random() * (190 - width))
}

const addAnimals = () => {
  let c = 0
  for (const ani of animal_list) {
    let animal = document.createElement('img')
    animal.src = `./game/animal_image/${ani}.png`
    animal.classList.add("animal");
    gameArea.appendChild(animal);
    animal.style.position = 'absolute';
    // animal.style.left = getRandomNumber(animal_width_obj[ani]) + 'px'
    // console.log(animal.style.left)
    // animal.style.left = 190 - 37.4 + 'px'
    animal.style.top = -300 * (c + 1) + 'px'
    c += 1
    // animal.style.top = 0 + 'px'
    animal.style.height = animal_height_obj[ani] + 'px'
    animal.style.clipPath = 'inset(0px 0px 0.001px 0px)'
  }
}

const resetAnimals = () => {
  let c = 0
  let animals = document.querySelectorAll(".animal");
  for (const animal of animals) {
    animal.style.top = -300 * (c + 1) + 'px'
    c += 1
    const url = animal.src
    const tempurl = url.split('/').pop();
    const animal_id = tempurl.substring(0, tempurl.lastIndexOf('.'));
    animal.style.height = animal_height_obj[animal_id] + 'px'
    animal.style.clipPath = 'inset(0px 0px 0.001px 0px)'
  }
}


const isCollide = (car, item) => {
  const aRect = car.getBoundingClientRect();
  const bRect = item.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

const endGame = (player, item) => {
  const url = item.src
  const tempurl = url.split('/').pop();
  const animal_id = tempurl.substring(0, tempurl.lastIndexOf('.'));

  player.dispatch(hit({ animal: animal_id }))
  player.dispatch(endAction())
  // console.log('end?', player.getState().player.start)
  return player
}

const moveAnimals = (car, speed, player) => {
  let Animals = document.querySelectorAll(".animal");
  Animals.forEach(function (item) {
    if (isCollide(car, item)) {
      player = endGame(player, item)
    }
    // http://127.0.0.1:5500/roadkill_simulator/game/animal_image/pangolin_340_242.png
    const url = item.src
    const tempurl = url.split('/').pop();
    const animal_id = tempurl.substring(0, tempurl.lastIndexOf('.'));
    let animalHeight = animal_height_obj[animal_id]
    let animalWidth = animal_width_obj[animal_id]
    let y = parseFloat(item.style.top) // 每條線離gameArea邊緣多少 700 px

    y += speed
    const circulationSize = 200
    // console.log(y)
    // if (y >= ga.offsetHeight) {
    if (y >= ga.offsetHeight + circulationSize) {
      item.style.left = getRandomNumber(animalWidth) + 'px'
      y = -1 * circulationSize; // 設兩百讓每個animal即使不同大小也同時輪迴（每個animal的height都小於100）
      item.style.clipPath = `inset(${circulationSize}px 0px 0.001px 0px)`;
      // item.style.clipPath = `inset(${animalHeight}px 0px 0.001px 0px)`;
    } // 會影響有沒有縮完整才跳回去（應該要y == gameArea高度(ga.offsetHeight) 以後跳回去，跟線不一樣，他需要跳回-50，再慢慢揭露，線都長一樣所以只要管長度）

    if (y > ga.offsetHeight - animalHeight) { // 會影響開始縮的時間 (應該要從y == ga.offsetHeight - 線的長度開始縮)
      let toClip = getClipBottom(item.style.clipPath) + speed // 在現有的clippath數字再加上去speed的量
      if (y > ga.offsetHeight) {
        toClip = 1000
      }
      const newInsetValue = `0px 0px ${toClip}px 0px`;
      item.style.clipPath = `inset(${newInsetValue})`;
      item.style.top = y + "px";
    }
    else if (y <= animalHeight) {
      let toClipTop = getClipTop(item.style.clipPath) - speed
      const newInsetValue = `${toClipTop}px 0px 0.001px 0px`;
      item.style.clipPath = `inset(${newInsetValue})`;
      item.style.top = y + "px";
    }
    else {
      const newInsetValue = `0px 0px 0.001px 0px`;
      item.style.clipPath = `inset(${newInsetValue})`;
      item.style.top = y + "px";
    }

  });
  return player
}

export { moveAnimals, addAnimals, resetAnimals }
export { animal_width_obj, animal_height_obj }