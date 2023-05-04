import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myObject: { start: false, speed: 5 },
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setMyObject: (state, action) => {
      state.myObject = action.payload;
    },
  },
});

export const { setMyObject } = mySlice.actions;

export default mySlice.reducer;