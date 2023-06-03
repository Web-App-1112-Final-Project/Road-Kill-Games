const lineHeight = '50'
const ga = document.querySelector(".gameArea");
// const gameAreaAbsoluteHeight = ga.offsetHeight - ga.offsetTop // 前者是gameArea高度，後者是gameArea離最上面多遠

const addlines = () => {
  for (let x = 0; x < 7; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.style.top = x * 110 + "px";
    div.style.height = lineHeight + 'px'
    div.style.width = '7px'
    div.style.backgroundColor = 'white'
    ga.appendChild(div);
  }
}

const movelines = (speed) => {
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

export { movelines, addlines }