import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCartItem(state, action) {
      const id = action.payload;
      const selectedItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (selectedItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        selectedItem.quantity--;
        selectedItem.totalPrice = selectedItem.totalPrice - selectedItem.price;
      }
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const exsistingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!exsistingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        exsistingItem.quantity++;
        exsistingItem.totalPrice = exsistingItem.totalPrice + newItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
