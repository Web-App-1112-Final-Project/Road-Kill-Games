const appStore = window.RTK;

// createSlice: accepts an initial state and a lookup table with reducer names and functions, and automatically generates action creator functions, action type strings, and a reducer function. There's a single store with multiple slices then...

const initState = {
  start: false,
  speed: 3,
  x: 200,
  y: 100
}

const playerSlice = appStore.createSlice({
  name: "player",
  initialState: initState,
  reducers: {
    start: state => {
      state.start = true
    },
    up: state => {
      state.y += state.speed
      return state;
    },
    down: state => {
      state.y -= state.speed
      return state
    },
    left: state => {
      state.x -= state.speed
      return state
    },
    right: state => {
      state.x += state.speed
      return state;
    },
  }
});


const { up, down, left, right, start, setX } = playerSlice.actions;

const rootReducer = {
  player: playerSlice.reducer,
};

// configureStore: creates a Redux store instance like the original createStore from Redux, but accepts a named options object and sets up the Redux DevTools Extension automatically
const player = appStore.configureStore({ reducer: rootReducer });
// ---------

// Update view: on init and listening (subscribe) to the player. Retrieve the state with [storeName].getState().[sliceName]
const initRender = () => {

  // lines on road
  const gameArea = document.querySelector('.gameArea')

  for (let x = 0; x < 5; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.style.top = x * 170 + "px";
    div.style.height = '80px'
    gameArea.appendChild(div);
  }

  // car
  let car = document.createElement('img')
  car.src='./assets/car1.png'
  car.innerHTML = 'car'
  car.setAttribute('class', 'car')
  gameArea.appendChild(car)

}

const renderplayer = () => {
  let car = document.querySelector('.car')
  car.style.left = player.getState().player.x + "px"
  car.style.bottom = player.getState().player.y + "px"
}
initRender()
player.subscribe(renderplayer);

export { up, down, left, right }
export { player, start as startAction } // start should be rename when export
