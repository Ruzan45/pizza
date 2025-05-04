import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slises/filterSlice.js'
import cart from './slises/cartSlice.js'

export const store = configureStore({
  reducer: {
    filterSlice,
    cart,
  },
})
