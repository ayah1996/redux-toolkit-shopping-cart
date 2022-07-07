import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  changed: false, // stay false in replace cart and true just when add / remove item to cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // replace front end cart with the cart reloaded form the firebase
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.cartItems;
    },
    removeCartItem(state, action) {
      const id = action.payload;
      const selectedItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;

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
      state.changed = true;
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
