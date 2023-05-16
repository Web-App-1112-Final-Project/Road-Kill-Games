import keys from "./key.js";
import { player } from "./player.js"
import { up, down, right, left } from "./player.js"

const movelines = () => {
  let lines = document.querySelectorAll(".line");
  let ga = document.querySelector(".gameArea");
  const gameAreaAbsoluteHeight = ga.offsetHeight - ga.offsetTop// gameArea長度
  lines.forEach(function (item) {
    let y = parseFloat(item.style.top) // 每條線離gameArea邊緣多少
    let speed = player.getState().player.speed
    if (y >= 600 + 70 + 0) { //以前0是 80
      y = 0;
    }
    y += speed

    if (y > gameAreaAbsoluteHeight + 20) {
      let len = parseFloat(item.style.height) - speed
      item.style.height = len + 'px'
      item.style.top = y + "px";
    }
    else if (y <= 80 && parseFloat(item.style.height) < 80) {
      let len = parseFloat(item.style.height) + speed
      item.style.top = 0 + "px";
      item.style.height = len + 'px'
    }
    else if (y <= 700 + 100 - 80 && y >= 0) {
      item.style.top = y + "px";
    }
  });
}

const playGame = () => {

  const gameArea = document.querySelector('.gameArea')
  const road = gameArea.getBoundingClientRect()
  const car = document.querySelector('.car')

  movelines()

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

export default playGame