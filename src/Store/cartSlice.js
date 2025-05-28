import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Each item has { id, name, price, image, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists, increase quantity
        existingItem.quantity += item.quantity || 1;
      } else {
        // Otherwise, add the item with a quantity (default to 1)
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // If quantity is 0 or less, remove item
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
