import keys from "./key.js";
import { player } from "./player.js"
import { up, down, right, left } from "./player.js"

// Update view: on init and listening (subscribe) to the player. Retrieve the state with [storeName].getState().[sliceName]

const lineHeight = '50'
const ga = document.querySelector(".gameArea");
const speed = player.getState().player.speed
const Nbush = 14

// const gameAreaAbsoluteHeight = ga.offsetHeight - ga.offsetTop // 前者是gameArea高度，後者是gameArea離最上面多遠


const bush_height_obj = {}
const bush_width_obj = {}
for (let x = 1; x <= Nbush; x++) {
  const image = new Image();
  image.src = `./assets/bush${x}.png`;
  image.addEventListener('load', function () {
    const height = image.naturalHeight;
    const width = image.naturalWidth;
    bush_height_obj[x] = height / 2
    bush_width_obj[x] = width / 2
  });
}

function getRandomNumber(width) {
  const ranges = [
    { min: 10, max: 195 - width },
    { min: 430 + width, max: 600 - width }
  ];
  const rangeIndex = Math.floor(Math.random() * ranges.length);
  const { min, max } = ranges[rangeIndex];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const initRender = () => {
  // lines on road
  const gameArea = document.querySelector('.gameArea')
  const grassArea = document.querySelector('.grass')

  for (let x = 0; x < 7; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.style.top = x * 110 + "px";
    div.style.height = lineHeight + 'px'
    div.style.width = '7px'
    div.style.backgroundColor = 'white'
    gameArea.appendChild(div);
  }

  for (let x = 1; x <= Nbush; x++) {
    let bush = document.createElement('img')
    bush.src = `./assets/bush${x}.png`
    bush.classList.add("bush");
    grassArea.appendChild(bush);
    bush.style.position = 'absolute';
    bush.style.left = getRandomNumber(bush_width_obj[x]) + 'px'
    // bush.style.left = 0 + 'px'
    bush.style.top = x * 50 + 'px'
    // bush.style.top = 0 + 'px'
    bush.style.height = bush_height_obj[x] + 'px'
    bush.style.clipPath = 'inset(0px 0px 0.001px 0px)'
  }

  let shadow = document.createElement('img')
  shadow.src = './assets/shadow2.png'
  shadow.style.position = 'absolute';
  grassArea.appendChild(shadow);
  shadow.style.left = 0 + 'px' //  -350 px ~ -250px; 250px ~ 350px
  shadow.style.top = 0 + 'px'
  shadow.style.height = 500 + 'px'
  shadow.style.width = 600 + 'px'

  // car
  let car = document.createElement('img')
  car.src = './assets/car2.png'
  car.innerHTML = 'car'
  car.setAttribute('class', 'car')
  gameArea.appendChild(car)
}


const movelines = () => {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function (item) {
    let y = parseFloat(item.style.top) // 每條線離gameArea邊緣多少 700 px
    if (y >= ga.offsetHeight) { y = 0; } // 會影響有沒有縮完整才跳回去（應該要y == gameArea高度(ga.offsetHeight) 以後跳回去）
    y += speed

    if (y + speed > ga.offsetHeight - lineHeight) { // 會影響開始縮的時間 (應該要從y == ga.offsetHeight - 線的長度開始縮)
      let len = parseFloat(item.style.height) - speed
      if (len <= speed) {
        len = 0
      }
      item.style.height = len + 'px'
      item.style.top = y + "px";
    }
    else if (y <= lineHeight && parseFloat(item.style.height) <= lineHeight) {
      let len = parseFloat(item.style.height) + speed
      item.style.top = 0 + "px";
      item.style.height = len + 'px'
    }
    else {
      item.style.height = lineHeight;
      item.style.top = y + "px";
    }
  });
}

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


const movebushes = () => {
  let bushes = document.querySelectorAll(".bush");
  bushes.forEach(function (item, idx) {
    let bush_id = parseInt(item.src.match(/(\d+)(?!.*\d+)/)[0])
    let bushHeight = bush_height_obj[bush_id]
    let bushWidth = bush_width_obj[bush_id]
    let y = parseFloat(item.style.top) // 每條線離gameArea邊緣多少 700 px

    y += speed
    const circulationSize = 200
    // if (y >= ga.offsetHeight) {
    if (y >= ga.offsetHeight + circulationSize) {
      item.style.left = getRandomNumber(bushWidth) + 'px'
      y = -1 * circulationSize; // 設兩百讓每個bush即使不同大小也同時輪迴（每個bush的height都小於100）
      item.style.clipPath = `inset(${circulationSize}px 0px 0.001px 0px)`;
      // item.style.clipPath = `inset(${bushHeight}px 0px 0.001px 0px)`;
    } // 會影響有沒有縮完整才跳回去（應該要y == gameArea高度(ga.offsetHeight) 以後跳回去，跟線不一樣，他需要跳回-50，再慢慢揭露，線都長一樣所以只要管長度）

    if (y > ga.offsetHeight - bushHeight) { // 會影響開始縮的時間 (應該要從y == ga.offsetHeight - 線的長度開始縮)
      let toClip = getClipBottom(item.style.clipPath) + speed // 在現有的clippath數字再加上去speed的量
      if (y > ga.offsetHeight) {
        toClip = 1000
      }
      const newInsetValue = `0px 0px ${toClip}px 0px`;
      item.style.clipPath = `inset(${newInsetValue})`;
      item.style.top = y + "px";
    }
    else if (y <= bushHeight) {
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
}


const playGame = () => {

  const gameArea = document.querySelector('.gameArea')
  const road = gameArea.getBoundingClientRect()
  const car = document.querySelector('.car')

  movelines()
  movebushes()
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
  }
  window.requestAnimationFrame(playGame)
}


export { initRender }
export default playGame
