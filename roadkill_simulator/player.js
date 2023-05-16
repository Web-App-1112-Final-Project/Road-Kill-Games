const appStore = window.RTK;

// createSlice: accepts an initial state and a lookup table with reducer names and functions, and automatically generates action creator functions, action type strings, and a reducer function. There's a single store with multiple slices then...

const initState = {
  start: false,
  speed: 3,
  drivespeed: 3,
  x: 200,
  y: 100
}

const playerSlice = appStore.createSlice({
  name: "player",
  initialState: initState,
  reducers: {
    start: (state, action) => {
      const { speed } = action.payload;
      state['speed'] = speed
      state.start = true
      return state;
    },
    up: state => {
      state.y += state.drivespeed
      return state;
    },
    down: state => {
      state.y -= state.drivespeed
      return state
    },
    left: state => {
      state.x -= state.drivespeed
      return state
    },
    right: state => {
      state.x += state.drivespeed
      return state;
    },
  }
});


const { up, down, left, right, start } = playerSlice.actions;

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
  const grassArea = document.querySelector('.grass')

  for (let x = 0; x < 5; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.style.top = x * 170 + "px";
    div.style.height = '70px'
    gameArea.appendChild(div);
  }

  let bush1 = document.createElement('img')
  bush1.src = './assets/bush1.png'
  bush1.classList.add("bush1");
  grassArea.appendChild(bush1);
  bush1.style.left = 250 + 'px' //  -350 px ~ -250px; 250px ~ 350px

  // car
  let car = document.createElement('img')
  car.src = './assets/car2.png'
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
export { player, start as startAction }
