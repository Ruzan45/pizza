import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slises/filterSlice'
import cart from './slises/cartSlice'
import pizzal from './slises/pizzaSlice'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlice,
    cart,
    pizzal,
  },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>(); //продвинутый диспатч чтобы можно было передавать асинхронный экшн внутрь диспатча