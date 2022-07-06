import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartVisiable: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartVisiable = !state.isCartVisiable;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
