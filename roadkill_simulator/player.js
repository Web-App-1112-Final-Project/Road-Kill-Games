const appStore = window.RTK;

// createSlice: accepts an initial state and a lookup table with reducer names and functions, and automatically generates action creator functions, action type strings, and a reducer function. There's a single store with multiple slices then...

const initState = {
  start: false,
  speed: 3,
  drivespeed: 3,
  x: 150,
  y: 0
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

const renderplayer = () => {
  let car = document.querySelector('.car')
  car.style.left = player.getState().player.x + "px"
  car.style.bottom = player.getState().player.y + "px"
}

player.subscribe(renderplayer);

export { up, down, left, right }
export { player, start as startAction }
