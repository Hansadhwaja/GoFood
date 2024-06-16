import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    updateItem: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty = Number(parseInt(action.payload.qty)+ parseInt(item.qty));
        item.price += action.payload.price;
      }
    },
    dropCart: (state) => {
      return [];
    }
  }
});

export const { addItem, removeItem, updateItem, dropCart } = cartSlice.actions;
export default cartSlice.reducer;
