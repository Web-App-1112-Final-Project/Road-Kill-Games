
const ga = document.querySelector(".gameArea");
const grassArea = document.querySelector(".grass")

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

function getRandomNumber(width) {
  const ranges = [
    { min: 10, max: 200 - width },
    { min: 530 + width, max: 700 - width }
  ];
  const rangeIndex = Math.floor(Math.random() * ranges.length);
  const { min, max } = ranges[rangeIndex];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// const bush_height_obj = {}
// const bush_width_obj = {}
// for (let x = 1; x <= Nbush; x++) {
//   const image = new Image();
//   image.src = `./game/assets/bush${x}.png`;
//   image.addEventListener('load', function () {
//     const height = image.naturalHeight;
//     const width = image.naturalWidth;
//     bush_height_obj[x] = height / 2
//     bush_width_obj[x] = width / 2
//   });
// }

const addBushes = (x, height, width) => {
  let bush = document.createElement('img')
  bush.src = `./js/game/assets/bush${x}.png`;
  bush.classList.add("bush");
  grassArea.appendChild(bush);
  bush.style.position = 'absolute';
  bush.style.left = getRandomNumber(width) + 'px'
  // bush.style.left = 0 + 'px'
  bush.style.top = x * 50 + 'px'
  // bush.style.top = 0 + 'px'
  bush.style.height = height + 'px'
  bush.style.clipPath = 'inset(0px 0px 0.001px 0px)'
}

const movebushes = (speed, bush_height_obj, bush_width_obj) => {
  let bushes = document.querySelectorAll(".bush");
  bushes.forEach(function (item) {
    // http://127.0.0.1:5500/roadkill_simulator/game/assets/bush3.png
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
    else if (y >= -bushHeight) {
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

export { movebushes, addBushes }
// export { bush_width_obj, bush_height_obj }