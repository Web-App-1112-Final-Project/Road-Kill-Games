import keys from "./key.js";
import { player } from "./player.js"
import { up, down, right, left } from "./player.js"

// Update view: on init and listening (subscribe) to the player. Retrieve the state with [storeName].getState().[sliceName]

const lineHeight = '50'
const bushHeight = 40
let ga = document.querySelector(".gameArea");
// const gameAreaAbsoluteHeight = ga.offsetHeight - ga.offsetTop // 前者是gameArea高度，後者是gameArea離最上面多遠

const initRender = () => {
  // lines on road
  const gameArea = document.querySelector('.gameArea')
  const grassArea = document.querySelector('.grass')

  for (let x = 0; x < 7; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.style.top = x * 110 + "px";
    div.style.height = lineHeight + 'px'
    gameArea.appendChild(div);
  }

  let bush1 = document.createElement('img')
  bush1.src = './assets/bush1.png'
  bush1.classList.add("bush1");
  grassArea.appendChild(bush1);
  bush1.style.left = 250 + 'px' //  -350 px ~ -250px; 250px ~ 350px
  bush1.style.top = 100 + 'px'
  bush1.style.height = bushHeight + 'px'
  bush1.style.clipPath = 'inset(0px 0px 0.001px 0px)'

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
    let speed = player.getState().player.speed
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
  let bushes = document.querySelectorAll(".bush1");
  bushes.forEach(function (item) {
    let y = parseFloat(item.style.top) // 每條線離gameArea邊緣多少 700 px
    // console.log(y)
    let speed = player.getState().player.speed
    if (y >= ga.offsetHeight) {
      y = -1 * bushHeight;
      item.style.clipPath = `inset(50px 0px 0.001px 0px)`;
    } // 會影響有沒有縮完整才跳回去（應該要y == gameArea高度(ga.offsetHeight) 以後跳回去，跟線不一樣，他需要跳回-50，再慢慢揭露，線都長一樣所以只要管長度）
    y += speed

    if (y > ga.offsetHeight - bushHeight) { // 會影響開始縮的時間 (應該要從y == ga.offsetHeight - 線的長度開始縮)
      let toClip = getClipBottom(item.style.clipPath) + speed // 在現有的clippath數字再加上去speed的量
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
