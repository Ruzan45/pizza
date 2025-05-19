import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
    totalCart: 0, //колличество всех пицц в корзине
    totalItems: 0, //колличество групп в корзине

};
const updSummPriceCart = (state) => {
    state.totalPrice = state.items.reduce((sum, obj) => { //сумма цены товаров в корзине
        return sum + (obj.price * obj.count);
    }, 0); // 0 это начальное значение sum 
    state.totalCart = state.items.reduce((sum, obj) => { //сумма количества товаров в корзине
        return obj.count + sum;
    }, 0); // 0 это начальное значение sum 
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const index = state.items.findIndex(item => //ищем индекс добавленного варианта товара в корзине state.items
                item.id === action.payload.id &&
                item.type === action.payload.type &&
                item.size === action.payload.size
            );
            if (index !== -1) { //если такой уже есть, то в элемент объекта с данным индексом добавляем в переменную count +1
                state.items[index].count++;
            } else {
                state.items.push({  //если не находит такой индекс, то берет все что содержится в action.payload, добавляет в state.items и добавляет в конце count
                    ...action.payload,
                    count: 1,
                    ids: state.items.length + 1, //задаём уникальный индекс каждой группе товаров
                });
            }
            updSummPriceCart(state);

        },

        cartMinus(state, action) {
            const index = action.payload;
            if (state.items[index].count > 1) {
                state.items[index].count--;
            }
            updSummPriceCart(state);
        },

        removeItem(state, action) {
            const indexRemove = state.items.findIndex(item => item.ids == action.payload);
            state.items.splice(indexRemove, 1);
            updSummPriceCart(state);

        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalCart = 0;
        },
    }

});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, clearItems, cartMinus } = cartSlice.actions;

export default cartSlice.reducer;