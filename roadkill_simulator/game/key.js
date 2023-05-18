const appStore = window.RTK;

// createSlice: accepts an initial state and a lookup table with reducer names and functions, and automatically generates action creator functions, action type strings, and a reducer function. There's a single store with multiple slices then...
const keySlice = appStore.createSlice({
  name: "key",
  initialState: {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
  },
  reducers: {
    pressOff: (state, action) => {
      const { key } = action.payload;
      state[key] = false
      return state;
    },
    pressOn: (state, action) => {
      const { key } = action.payload;
      state[key] = true
      return state;
    }
  }
});

const { pressOn, pressOff } = keySlice.actions;

const rootReducer = {
  key: keySlice.reducer,
};

// configureStore: creates a Redux store instance like the original createStore from Redux, but accepts a named options object and sets up the Redux DevTools Extension automatically
const keys = appStore.configureStore({ reducer: rootReducer });
// ---------

document.addEventListener("keydown", (e) => keys.dispatch(pressOn({ key: e.key })));
document.addEventListener("keyup", (e) => keys.dispatch(pressOff({ key: e.key })));

export default keys